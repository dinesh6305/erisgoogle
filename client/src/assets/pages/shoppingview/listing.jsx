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
    const navigate = useNavigate(); // Add navigate hook for navigation
    const { user } = useSelector(state => state.auth);
    const { productList: allProducts, productDetails, isLoading } = useSelector(state => state.shopProducts);
    const [filter, setFilters] = useState({});
    const [tempFilter, setTempFilter] = useState({}); // Temporary filters during selection
    const [sort, setSort] = useState("price-lowtohigh");
    const [tempSort, setTempSort] = useState("price-lowtohigh"); // Temporary sort during selection
    const [opendialog, setOpendialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterPanelOpen, setFilterPanelOpen] = useState(false); // Track filter panel state
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [searchTimeout, setSearchTimeout] = useState(null); // For debouncing search
    const [isSearching, setIsSearching] = useState(false); // Flag to indicate active search
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products for display
    
    // Keep track of whether the initial fetch has happened
    const initialFetchDone = useRef(false);
    // Store all products for client-side filtering
    const allProductsRef = useRef([]);
    // Reference for the sort dropdown
    const sortButtonRef = useRef(null);
    
    // Add location hook to track navigation
    const location = useLocation();

    // Initialize from URL or sessionStorage
    useEffect(() => {
        try {
            // Initialize search query from URL params
            const queryParam = searchParams.get('q');
            if (queryParam) {
                setSearchQuery(queryParam);
            } else {
                const savedSearch = sessionStorage.getItem('searchQuery');
                if (savedSearch) {
                    setSearchQuery(savedSearch);
                }
            }

            // Initialize filters from sessionStorage
            const savedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
            setFilters(savedFilters);
            setTempFilter(savedFilters);
            
            // Initialize sort from sessionStorage
            const savedSort = sessionStorage.getItem('sort') || "price-lowtohigh";
            setSort(savedSort);
            setTempSort(savedSort);
        } catch (error) {
            console.error("Error initializing state from storage:", error);
            // Fallback to default values
            setFilters({});
            setTempFilter({});
            setSort("price-lowtohigh");
            setTempSort("price-lowtohigh");
        }
    }, []);

    // Clear search when component unmounts (navigating away)
    useEffect(() => {
        return () => {
            // Clear search state when component unmounts
            sessionStorage.removeItem('searchQuery');
            console.log("Cleared search on navigation");
        };
    }, []);

    // Fetch all products once on mount
    useEffect(() => {
        if (!initialFetchDone.current) {
            console.log("Fetching all products for client-side filtering");
            // Fetch all products without filters or search query
            dispatch(fetchAllFilterProducts({ 
                searchQuery: '',
                filterParams: {},
                sortParams: 'price-lowtohigh' // Default sort
            }));
            initialFetchDone.current = true;
        }
    }, [dispatch]);

    // Store all products in ref when they're loaded
    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            allProductsRef.current = allProducts;
            
            // Apply initial filtering
            applyFiltersAndSearch();
        }
    }, [allProducts]);

    // Apply filters, search and sorting whenever those values change
    useEffect(() => {
        if (allProductsRef.current.length > 0) {
            applyFiltersAndSearch();
        }
    }, [filter, sort, searchQuery]);

    // Function to filter, search and sort products client-side
    const applyFiltersAndSearch = () => {
        setIsSearching(true);
        
        setTimeout(() => {
            let results = [...allProductsRef.current];
            
            // Apply search
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                results = results.filter(product => 
                    (product.productName && product.productName.toLowerCase().includes(query)) || 
                    (product.description && product.description.toLowerCase().includes(query)) || 
                    (product.category && product.category.toLowerCase().includes(query))
                );
            }
            
            // Apply filters
            if (Object.keys(filter).length > 0) {
                Object.keys(filter).forEach(filterKey => {
                    if (filter[filterKey].length > 0) {
                        results = results.filter(product => {
                            // Check if the product has the property and it matches any of the filter values
                            return filter[filterKey].some(filterValue => {
                                // Handle different filter types
                                if (filterKey === 'category') {
                                    return product.category === filterValue;
                                } else if (filterKey === 'priceRange') {
                                    const [min, max] = filterValue.split('-').map(Number);
                                    const price = parseFloat(product.salePrice); // Changed from price to salePrice
                                    return price >= min && (max === 0 || price <= max);
                                } else if (filterKey === 'rating') {
                                    return product.rating >= parseInt(filterValue);
                                }
                                return false;
                            });
                        });
                    }
                });
            }
            
            // Apply sorting
            results.sort((a, b) => {
                switch (sort) {
                    case 'price-lowtohigh':
                        return parseFloat(a.salePrice) - parseFloat(b.salePrice); // Changed from price to salePrice
                    case 'price-hightolow':
                        return parseFloat(b.salePrice) - parseFloat(a.salePrice); // Changed from price to salePrice
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
        }, 300); // Small delay to show loading state
    };

    useEffect(() => {
        if (productDetails !== null) {
            setOpendialog(true);
        }
    }, [productDetails]);

    // Initialize tempFilter and tempSort when filter panel opens
    useEffect(() => {
        if (filterPanelOpen) {
            setTempFilter({ ...filter });
            setTempSort(sort);
        }
    }, [filterPanelOpen, filter, sort]);
    
    function handleGetproductdetails(currentid) {
        console.log("Fetching product details for ID:", currentid);
        
        // Make sure we have a valid ID
        if (!currentid) {
            console.error("Invalid product ID:", currentid);
            return;
        }
        
        // Dispatch action to fetch product details
        dispatch(fetchProductsDetails({ id: currentid }));
    }

    function handleSort(value) {
        setSort(value);
        sessionStorage.setItem('sort', value);
        console.log("Sort value changed to:", value);
        setDropdownOpen(false);
    }

    // Toggle dropdown
    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen);
    }

    // Handle sort change within filter panel
    function handleTempSort(value) {
        setTempSort(value);
        console.log("Temp sort value changed to:", value);
    }

    // Handle search with debounce
    const handleSearch = useCallback((e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setIsSearching(true);
        
        // Clear any existing timeout
        if (searchTimeout) clearTimeout(searchTimeout);
        
        // Save search to sessionStorage
        sessionStorage.setItem('searchQuery', query);
        
        // Update URL params
        if (query) {
            searchParams.set('q', query);
        } else {
            searchParams.delete('q');
        }
        setSearchParams(searchParams);
        
        // Set a new timeout to delay the search
        const timeoutId = setTimeout(() => {
            console.log("Searching for:", query);
            // Client-side searching happens in the useEffect via applyFiltersAndSearch
        }, 500); // 500ms delay
        
        setSearchTimeout(timeoutId);
    }, [searchTimeout, searchParams]);

    // Clear search field
    const clearSearch = useCallback(() => {
        setSearchQuery('');
        sessionStorage.removeItem('searchQuery');
        searchParams.delete('q');
        setSearchParams(searchParams);
        
        // Client-side filtering will be triggered by the useEffect
        setIsSearching(false);
    }, [searchParams]);

    // Update URL when filter changes
    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            const queryString = createSearchParamsHelper(filter);
            console.log("Updated search params:", queryString);
            
            // Preserve the search query when updating filters
            const currentParams = new URLSearchParams(queryString);
            if (searchQuery) {
                currentParams.set('q', searchQuery);
            }
            
            setSearchParams(currentParams);
        } else if (searchQuery) {
            // If there are no filters but there is a search query
            const params = new URLSearchParams();
            params.set('q', searchQuery);
            setSearchParams(params);
        } else {
            // Clear params if no filters and no search
            setSearchParams({});
        }
    }, [filter, searchQuery, setSearchParams]);

    // Modified to work with temp filter for the panel
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

        // Remove empty arrays
        if (cpyFilters[getSectionId].length === 0) {
            delete cpyFilters[getSectionId];
        }

        console.log("Updated temp filters:", cpyFilters);
        setTempFilter(cpyFilters);
    }

    // Apply filters and sort, then close panel
    function applyFilters() {
        setFilters({ ...tempFilter });
        setSort(tempSort);
        sessionStorage.setItem('filters', JSON.stringify(tempFilter));
        sessionStorage.setItem('sort', tempSort);
        setFilterPanelOpen(false);
        
        // Client-side filtering will be triggered by useEffect
    }

    // Clear all filters and reset sort to default
    function clearFilters() {
        const emptyFilters = {};
        setTempFilter(emptyFilters);
        setTempSort("price-lowtohigh");

        // Immediately apply cleared filters
        setFilters(emptyFilters);
        setSort("price-lowtohigh");
        sessionStorage.setItem('filters', JSON.stringify(emptyFilters));
        sessionStorage.setItem('sort', "price-lowtohigh");
        
        console.log("All filters cleared and sort reset");
        
        // Client-side filtering will be triggered by useEffect
    }

    // Close filter panel when clicking outside
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

    // Close sort dropdown when clicking outside
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

    // Highlight search terms in product titles
    const highlightSearchTerm = (text, searchTerm) => {
        if (!searchTerm || typeof text !== 'string') return text;
        
        try {
            // Escape special regex characters in the search term
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
                            className="flex-1 mr-2 bg-white text-black hover:bg-gray-200"
                            onClick={clearFilters}
                        >
                            Clear All
                        </Button>
                        <Button
                            variant="default"
                            className="flex-1 bg-white text-black hover:bg-gray-200"
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
                                    onClick={() => navigate("/shop/home")}
                                >
                                    <ArrowLeftIcon className="h-5 w-5 text-white" />
                                </Button>
                            </div>

                            {/* Middle section - Title */}
                            <div className="flex justify-center items-center">
                                
                                <h2 className="text-lg font-bold text-white md:hidden ml-2 text-left sm:text-2xl">
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
        </div>
    );
}

export default ShoppingListing;