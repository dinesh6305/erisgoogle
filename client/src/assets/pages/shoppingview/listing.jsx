import React, { useState, useEffect, useCallback, useRef } from 'react';
import ProductFilter from "../../components/shoppingview/filter";
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon, FilterIcon, XIcon, SearchIcon, Loader2, ArrowLeftIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilterProducts, fetchProductsDetails } from '@/store/shop/shopproduct';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '@/assets/components/common/ProductCard';
import ProductDetails from '../../components/shoppingview/ProductDetails';
import { sortOptions } from '@/config/index';

function createSearchParamsHelper(filters) {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(sectionId => {
        filters[sectionId].forEach(option => {
            params.append(sectionId, option);
        });
    });
    return params.toString();
}

function ShoppingListing() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.auth);
    const { productList: allProducts, productDetails, isLoading } = useSelector(state => state.shopProducts);
    const [filter, setFilters] = useState({});
    const [tempFilter, setTempFilter] = useState({});
    const [sort, setSort] = useState("price-lowtohigh");
    const [tempSort, setTempSort] = useState("price-lowtohigh");
    const [opendialog, setOpendialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const initialFetchDone = useRef(false);
    const allProductsRef = useRef([]);
    const sortButtonRef = useRef(null);

    useEffect(() => {
        try {
            const queryParam = searchParams.get('q');
            if (queryParam) {
                setSearchQuery(queryParam);
            } else {
                const savedSearch = sessionStorage.getItem('searchQuery');
                if (savedSearch) {
                    setSearchQuery(savedSearch);
                }
            }

            const savedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
            setFilters(savedFilters);
            setTempFilter(savedFilters);

            const savedSort = sessionStorage.getItem('sort') || "price-lowtohigh";
            setSort(savedSort);
            setTempSort(savedSort);
        } catch (error) {
            console.error("Error initializing state from storage:", error);
            setFilters({});
            setTempFilter({});
            setSort("price-lowtohigh");
            setTempSort("price-lowtohigh");
        }
    }, []);

    useEffect(() => {
        return () => {
            clearCache();
        };
    }, []);

    const clearCache = () => {
        sessionStorage.removeItem('searchQuery');
        sessionStorage.removeItem('filters');
        sessionStorage.removeItem('sort');
        console.log("Cleared filters and search query from cache");
    };

    useEffect(() => {
        if (!initialFetchDone.current) {
            dispatch(fetchAllFilterProducts({ 
                searchQuery: '',
                filterParams: {},
                sortParams: 'price-lowtohigh'
            }));
            initialFetchDone.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            allProductsRef.current = allProducts;
            applyFiltersAndSearch();
        }
    }, [allProducts]);

    useEffect(() => {
        if (allProductsRef.current.length > 0) {
            applyFiltersAndSearch();
        }
    }, [filter, sort, searchQuery]);

    const applyFiltersAndSearch = () => {
        setIsSearching(true);

        setTimeout(() => {
            let results = [...allProductsRef.current];

            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                results = results.filter(product => 
                    (product.productName && product.productName.toLowerCase().includes(query)) || 
                    (product.description && product.description.toLowerCase().includes(query)) || 
                    (product.category && product.category.toLowerCase().includes(query))
                );
            }

            if (Object.keys(filter).length > 0) {
                Object.keys(filter).forEach(filterKey => {
                    if (filter[filterKey].length > 0) {
                        results = results.filter(product => {
                            return filter[filterKey].some(filterValue => {
                                if (filterKey === 'category') {
                                    return product.category === filterValue;
                                } else if (filterKey === 'priceRange') {
                                    const [min, max] = filterValue.split('-').map(Number);
                                    const price = parseFloat(product.salePrice);
                                    return price >= min && (max === 0 || price <= max);
                                } else if (filterKey === 'rating') {
                                    return product.rating >= parseInt(filterValue);
                                } else if (filterKey === 'color') {
                                    return product.color && product.color.toLowerCase() === filterValue.toLowerCase();
                                }
                                return false;
                            });
                        });
                    }
                });
            }

            results.sort((a, b) => {
                switch (sort) {
                    case 'price-lowtohigh':
                        return parseFloat(a.salePrice) - parseFloat(b.salePrice);
                    case 'price-hightolow':
                        return parseFloat(b.salePrice) - parseFloat(a.salePrice);
                    case 'rating-hightolow':
                        return (b.rating || 0) - (a.rating || 0);
                    case 'newest':
                        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                    case 'alphabetical':
                        return (a.productName || '').localeCompare(b.productName || '');
                    default:
                        return 0;
                }
            });

            setFilteredProducts(results);
            setIsSearching(false);
        }, 300);
    };

    useEffect(() => {
        if (productDetails !== null) {
            setOpendialog(true);
        }
    }, [productDetails]);

    useEffect(() => {
        if (filterPanelOpen) {
            setTempFilter({ ...filter });
            setTempSort(sort);
        }
    }, [filterPanelOpen, filter, sort]);

    function handleGetproductdetails(currentid) {
        if (!currentid) {
            console.error("Invalid product ID:", currentid);
            return;
        }
        dispatch(fetchProductsDetails({ id: currentid }));
    }

    function handleTempSort(value) {
        setTempSort(value);
    }

    const handleSearch = useCallback((e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setIsSearching(true);

        if (searchTimeout) clearTimeout(searchTimeout);

        sessionStorage.setItem('searchQuery', query);

        if (query) {
            searchParams.set('q', query);
        } else {
            searchParams.delete('q');
        }
        setSearchParams(searchParams);

        const timeoutId = setTimeout(() => {
            console.log("Searching for:", query);
        }, 500);
        setSearchTimeout(timeoutId);
    }, [searchTimeout, searchParams]);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
        sessionStorage.removeItem('searchQuery');
        searchParams.delete('q');
        setSearchParams(searchParams);
        setIsSearching(false);
    }, [searchParams]);

    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            const queryString = createSearchParamsHelper(filter);
            const currentParams = new URLSearchParams(queryString);
            if (searchQuery) {
                currentParams.set('q', searchQuery);
            }
            setSearchParams(currentParams);
        } else if (searchQuery) {
            const params = new URLSearchParams();
            params.set('q', searchQuery);
            setSearchParams(params);
        } else {
            setSearchParams({});
        }
    }, [filter, searchQuery, setSearchParams]);

    function handleFilter(getSectionId, getCurrentOption) {
        let cpyFilters = { ...tempFilter };
        if (!cpyFilters[getSectionId]) {
            cpyFilters[getSectionId] = [];
        }

        const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

        if (indexOfCurrentOption === -1) {
            cpyFilters[getSectionId].push(getCurrentOption);
        } else {
            cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }

        if (cpyFilters[getSectionId].length === 0) {
            delete cpyFilters[getSectionId];
        }

        setTempFilter(cpyFilters);
    }

    function applyFilters() {
        setFilters({ ...tempFilter });
        setSort(tempSort);
        sessionStorage.setItem('filters', JSON.stringify(tempFilter));
        sessionStorage.setItem('sort', tempSort);
        setFilterPanelOpen(false);
    }

    function clearFilters() {
        const emptyFilters = {};
        setTempFilter(emptyFilters);
        setTempSort("price-lowtohigh");
        setFilters(emptyFilters);
        setSort("price-lowtohigh");
        sessionStorage.setItem('filters', JSON.stringify(emptyFilters));
        sessionStorage.setItem('sort', "price-lowtohigh");
    }

    
    useEffect(() => {
        function handleClickOutside(e) {
            const filterPanel = document.getElementById('filter-panel');
            if (filterPanel && !filterPanel.contains(e.target) &&
                !e.target.closest('#filter-toggle-btn')) {
                setFilterPanelOpen(false);
            }
        }

        if (filterPanelOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterPanelOpen]);

    
    useEffect(() => {
        function handleClickOutside(e) {
            if (sortButtonRef.current && !sortButtonRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

   
    const highlightSearchTerm = (text, searchTerm) => {
        if (!searchTerm || typeof text !== 'string') return text;
        
        try {
            
            const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
            const parts = text.split(regex);
            
            return parts.map((part, i) => 
                regex.test(part) ? <span key={i} className="bg-purple-700">{part}</span> : part
            );
        } catch (error) {
            console.error("Error highlighting search term:", error);
            return text;
        }
    };

    return (
        <div className="bg-black min-h-screen pb-10">
            <div className="container mx-auto p-4">
                {/* Filter panel - slides in from side for all screen sizes */}
                <div
                    id="filter-panel"
                    className={`fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-black z-50 transition-transform duration-300 ease-in-out transform ${filterPanelOpen ? 'translate-x-0' : '-translate-x-full'
                        } overflow-y-auto`}
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-lg font-bold text-white">Filter Products</h2>
                        <Button
                            variant="ghost"
                            className="p-1 text-white"
                            onClick={() => setFilterPanelOpen(false)}
                        >
                            <XIcon className="h-5 w-5" />
                        </Button>
                    </div>
                    
                    {/* Search box inside filter panel */}
                    <div className="p-4 border-b border-gray-700">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full p-2 pl-9 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                aria-label="Search products in filter panel"
                            />
                            {isSearching ? (
                                <Loader2 className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500 animate-spin" />
                            ) : (
                                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            )}
                            {searchQuery && (
                                <button 
                                    onClick={clearSearch}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    aria-label="Clear search"
                                >
                                    <XIcon className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Sort By Section */}
                    <div className="p-4 border-b border-gray-700">
                        <div className="mb-3">
                            <h3 className="text-md font-semibold text-white flex items-center">
                                <ArrowUpDownIcon className="h-4 w-4 mr-2" />
                                Sort By
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {sortOptions.map((sortOption) => (
                                <div key={sortOption.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`sort-${sortOption.id}`}
                                        name="sort-option"
                                        value={sortOption.id}
                                        checked={tempSort === sortOption.id}
                                        onChange={() => handleTempSort(sortOption.id)}
                                        className="mr-2 h-4 w-4 accent-purple-600"
                                    />
                                    <label 
                                        htmlFor={`sort-${sortOption.id}`}
                                        className="text-sm text-gray-300 cursor-pointer"
                                    >
                                        {sortOption.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Filter Section */}
                    <div className="p-4">
                        <ProductFilter
                            filter={tempFilter}
                            handlefilter={handleFilter}
                            isMobile={true}
                        />
                    </div>
                    <div className="p-4 border-t border-gray-700 flex justify-between sticky bottom-0 bg-black">
                        <Button
                            variant="outline"
                            className="flex-1 mr-2 bg-purple-700 text-black hover:bg-purple-800"
                            onClick={clearFilters}
                        >
                            Clear All
                        </Button>
                        <Button
                            variant="default"
                            className="flex-1 bg-purple-700 text-black hover:bg-purple-800"
                            onClick={applyFilters}
                        >
                            Apply
                        </Button>
                    </div>
                </div>

                {/* Blurred overlay for filter panel */}
                {filterPanelOpen && (
                    <div
                        className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-opacity-20 z-40"
                        onClick={() => setFilterPanelOpen(false)}
                    ></div>
                )}

                <div className="rounded-lg shadow-sm bg-black text-white mt-16">
                    {/* Search Box in the sticky header - Modified width for large screens */}
                    <div className="p-4 border-b bg-black sticky top-0 z-20 flex justify-center lg:justify-start">
                        <div className="relative w-full lg:w-2/5">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                aria-label="Search products"
                            />
                            {isSearching ? (
                                <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500 animate-spin" />
                            ) : (
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            )}
                            {searchQuery && (
                                <button 
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    aria-label="Clear search"
                                >
                                    <XIcon className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Added Navigation Grid Layout */}
                    <div className="p-4 border-b flex items-center justify-between sticky top-[73px] bg-black z-10">
                        <div className="grid grid-cols-3 items-center w-full">
                            {/* Left section - Navigation buttons */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {navigate("/shop/home");
                                        clearCache();}
                                    }
                                >
                                    <ArrowLeftIcon className="h-5 w-5 text-white" />
                                </Button>
                            </div>

                            {/* Middle section - Title */}
                            <div className="flex justify-center items-center">
                                
                                <h2 className="text-lg font-bold text-white  ml-2 text-left sm:text-2xl">
                                    All Products
                                </h2>
                            </div>

                            {/* Right section - Product count and sort */}
                            <div className="flex items-center justify-end gap-2 relative">
                                <span className="text-sm md:text-base">
                                    {filteredProducts?.length || 0}
                                </span>
                                <div className="relative inline-block text-left" ref={sortButtonRef}>
                                    <span className="text-lg font-bold">Products</span>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        {isLoading ? (
                            // Loading state - only show during initial load
                            <div className="flex flex-col justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                                <p className="text-gray-400">Loading products...</p>
                            </div>
                        ) : isSearching ? (
                            // Searching state
                            <div className="flex flex-col justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                                {searchQuery && <p className="text-gray-400">Searching for "{searchQuery}"...</p>}
                            </div>
                        ) : (
                            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                {filteredProducts && filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product._id || product.id} // Handle both _id and id
                                            product={{
                                                ...product,
                                                // Make sure both _id and id are available
                                                _id: product._id || product.id,
                                                id: product.id || product._id
                                            }}
                                            userId={user?.id}
                                            highlightTerm={searchQuery}
                                            handleGetproductdetails={() => 
                                                handleGetproductdetails(product._id || product.id)
                                            }
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-10 text-white">
                                        {searchQuery ? (
                                            <>
                                                <p className="text-xl mb-2">No products match "{searchQuery}"</p>
                                                <p className="text-gray-400 mb-6">Try using different keywords or checking your spelling</p>
                                            </>
                                        ) : (
                                            <p>No products found. Try adjusting your filters.</p>
                                        )}
                                        
                                        {(Object.keys(filter).length > 0 || searchQuery) && (
                                            <Button
                                                onClick={() => {
                                                    clearFilters();
                                                    clearSearch();
                                                }}
                                                className="mt-4 bg-purple-800 hover:bg-purple-700"
                                            >
                                                Clear All Filters & Search
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {productDetails && (
                    <ProductDetails
                        open={opendialog}
                        setOpen={setOpendialog}
                        productDetails={productDetails}
                    />
                )}
            </div>
            <Button
                            id="filter-toggle-btn"
                            variant="default"
                            size="icon"
                            className="fixed bottom-6 right-6 h-12 w-12 rounded-full z-30 bg-purple-700 hover:bg-purple-600 shadow-lg flex items-center justify-center"
                            onClick={() => setFilterPanelOpen(true)}
                        >
                            <FilterIcon className="h-5 w-5" />
                        </Button>
        </div>
    );
}

export default ShoppingListing;