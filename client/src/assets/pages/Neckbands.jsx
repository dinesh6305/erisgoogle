import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductFilter from "../components/shoppingview/filter";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon, ArrowLeftIcon, FilterIcon, XIcon, SearchIcon, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilterProducts, fetchProductsDetails } from '@/store/shop/shopproduct';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '@/assets/components/common/ProductCard';
import ProductDetails from '../components/shoppingview/ProductDetails';
import { sortOptions } from '@/config';

function createSearchParamsHelper(filters) {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(sectionId => {
        filters[sectionId].forEach(option => {
            params.append(sectionId, option);
        });
    });
    return params.toString();
}

function Neckband() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { productList, productDetails } = useSelector(state => state.shopProducts);
    const [filter, setFilters] = useState({});
    const [tempFilter, setTempFilter] = useState({});
    const [sort, setSort] = useState("price-lowtohigh");
    const [tempSort, setTempSort] = useState("price-lowtohigh");
    const [opendialog, setOpendialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const sortButtonRef = useRef(null);
    
    // Search related states and refs
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [searchTimeout, setSearchTimeout] = useState(null); // For debouncing search
    const [isSearching, setIsSearching] = useState(false); // Flag to indicate active search
    const allProductsRef = useRef([]); // Store all products for client-side filtering
    const [displayProducts, setDisplayProducts] = useState([]); // Filtered products to display

    // Calculate the actual products to display and their count
    const productsToDisplay = searchQuery ? displayProducts : productList || [];
    const productCount = productsToDisplay.length;

    useEffect(() => {
        if (productDetails !== null) {
            setOpendialog(true);
        }
    }, [productDetails]);

    // Initialize from URL or sessionStorage for search
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
        } catch (error) {
            console.error("Error initializing search from storage:", error);
        }
    }, []);

    // Store products in ref and update display products when productList changes
    useEffect(() => {
        if (productList && productList.length > 0) {
            allProductsRef.current = productList;
            
            // Initial setup of display products
            if (searchQuery) {
                performClientSearch(searchQuery);
            } else {
                setDisplayProducts(productList);
            }
        }
    }, [productList]);

    // Detect screen size changes for responsive behavior
    useEffect(() => {
        function handleResize() {
            setIsMobileView(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Clear search when component unmounts
    useEffect(() => {
        return () => {
            sessionStorage.removeItem('searchQuery');
            console.log("Cleared search on unmount");
        };
    }, []);

    // Add custom navigation function that clears search
    const navigateAndClearSearch = (path) => {
        // Clear search state before navigation
        sessionStorage.removeItem('searchQuery');
        setSearchQuery('');
        console.log("Search cleared before navigation");
        
        // Navigate to the specified path
        navigate(path);
    };

    // Perform client-side search
    const performClientSearch = (query) => {
        if (!query.trim()) {
            setDisplayProducts(allProductsRef.current);
            return;
        }
        
        const searchTerm = query.toLowerCase();
        const results = allProductsRef.current.filter(product => 
            (product.productName && product.productName.toLowerCase().includes(searchTerm)) || 
            (product.description && product.description.toLowerCase().includes(searchTerm)) || 
            (product.category && product.category.toLowerCase().includes(searchTerm))
        );
        
        // Sort the search results based on current sort criteria
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
        
        setDisplayProducts(results);
    };

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
            // Perform client-side search
            performClientSearch(query);
            setTimeout(() => setIsSearching(false), 300);
        }, 500); // 500ms delay
        
        setSearchTimeout(timeoutId);
    }, [searchTimeout, searchParams, sort]); // Added sort as dependency

    // Clear search field
    const clearSearch = useCallback(() => {
        setSearchQuery('');
        sessionStorage.removeItem('searchQuery');
        searchParams.delete('q');
        setSearchParams(searchParams);
        
        // Reset display products to all products
        setDisplayProducts(allProductsRef.current);
        setIsSearching(false);
    }, [searchParams]);

    // Reset filters when component unmounts
    useEffect(() => {
        return () => {
            sessionStorage.removeItem('filters');
            sessionStorage.removeItem('searchQuery'); // Also clear search on unmount
        };
    }, []);

    // Close sort dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (sortButtonRef.current &&
                !sortButtonRef.current.contains(e.target) &&
                dropdownOpen) {
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

    // Initialize tempFilter when filter panel opens
    useEffect(() => {
        if (filterPanelOpen) {
            setTempFilter({ ...filter });
            setTempSort(sort); // Initialize temp sort with current sort
        }
    }, [filterPanelOpen, filter, sort]);

    function handleGetproductdetails(currentid) {
        dispatch(fetchProductsDetails({ id: currentid }));
    }

    function handleSort(value) {
        setSort(value);
        setDropdownOpen(false);
        
        // Re-sort the displayed products client-side when sort option changes
        if (displayProducts.length > 0) {
            const sortedResults = [...displayProducts];
            sortedResults.sort((a, b) => {
                switch (value) {
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
            setDisplayProducts(sortedResults);
        }
    }
    
    // Handle sort change within filter panel
    function handleTempSort(value) {
        setTempSort(value);
        console.log("Temp sort value changed to:", value);
    }

    // Update URL when filter changes
    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            const queryString = createSearchParamsHelper(filter);
            
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
    }, [filter, searchQuery]);

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

        setTempFilter(cpyFilters);
    }

    // Apply filters and close panel
    function applyFilters() {
        setFilters({ ...tempFilter });
        setSort(tempSort); // Apply the temporary sort value
        sessionStorage.setItem('filters', JSON.stringify(tempFilter));
        sessionStorage.setItem('sort', tempSort);
        setFilterPanelOpen(false);
    }

    // Clear all filters
    function clearFilters() {
        const emptyFilters = {};
        setTempFilter(emptyFilters);
        setTempSort("price-lowtohigh"); // Reset temp sort to default
        setFilters(emptyFilters);
        setSort("price-lowtohigh"); // Reset sort to default
        sessionStorage.setItem('filters', JSON.stringify(emptyFilters));
        sessionStorage.setItem('sort', "price-lowtohigh");
    }

    // Clear all filters and search
    function clearAllFiltersAndSearch() {
        clearFilters();
        clearSearch();
    }

    useEffect(() => {
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
        setTempFilter(JSON.parse(sessionStorage.getItem('filters')) || {});
        // Load sort from sessionStorage
        const savedSort = sessionStorage.getItem('sort') || "price-lowtohigh";
        setSort(savedSort);
        setTempSort(savedSort);
    }, []);

    useEffect(() => {
        if (filter !== null && sort !== null) {
            dispatch(fetchAllFilterProducts({ filterParams: { ...filter, category: 'neckband' }, sortParams: sort }));
        }
    }, [dispatch, sort, filter]);

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
        <div className="bg-black min-h-screen">
            <div className="container mx-auto p-4">
            {/* Filter panel - responsive: slides from bottom on mobile, from side on desktop */}
            <div
                id="filter-panel"
                className={`fixed bg-black z-50 transition-all duration-300 ease-in-out overflow-y-auto
                    ${isMobileView
                        ? `top-0 left-0 h-full w-[80%] max-w-[300px] ${filterPanelOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-gray-700`
                        : `top-0 left-0 h-full w-[80%] max-w-[300px] ${filterPanelOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-gray-700`
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-bold text-white">Filter Products</h2>
                    <Button
                        variant="ghost"
                        className="p-1 text-white hover:bg-gray-800"
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
                            placeholder="Search neckbands..."
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
                
                {isMobileView && (
                    <div className="flex justify-center py-2">
                        <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                )}
                <div className="p-4">
                <ProductFilter
                    filter={tempFilter}
                    handlefilter={handleFilter}
                    isMobile={true}
                    showOnly={['color']} // Only show color filters
                    hideCategories={true} // Explicitly hide categories
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

            {/* Pure blur overlay */}
            {filterPanelOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-md bg-transparent z-40"
                    onClick={() => setFilterPanelOpen(false)}
                ></div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 p-6 bg-black text-white mt-10 ">
                <div className="bg-background w-full rounded-lg shadow-sm col-span-full">
                    {/* Search Box in the sticky header */}
                    <div className="p-4 border-b bg-black sticky top-0 z-20 flex justify-center lg:justify-start">
                        <div className="relative w-full lg:w-2/5">
                            <input
                                type="text"
                                placeholder="Search neckbands..."
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
                    
                    <div className="p-4 border-b lg:mt-0">
                        <div className="grid grid-cols-3 items-center">
                            {/* Left section - Navigation buttons */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => navigateAndClearSearch("/shop/home")}
                                >
                                    <ArrowLeftIcon className="h-5 w-5 text-white" />
                                </Button>
                            </div>

                            {/* Middle section - Title */}
                            <div className="flex justify-center items-center">
                                <h2 className="text-lg font-extrabold text-white hidden md:block">
                                   {searchQuery ? `Search results for "${searchQuery}"` : "Neckband"}
                                </h2>
                                <h2 className="text-lg font-extrabold text-white md:hidden ml-2 text-left">
                                    Neckbands
                                </h2>
                            </div>

                            {/* Right section - Product count and sort - FIXED */}
                            <div className="flex items-center justify-end gap-2 relative">
                                <span className="text-sm md:text-base">
                                    {productCount}
                                </span>
                                <div className="relative inline-block text-left" ref={sortButtonRef}>
                                    <span className="text-lg font-bold">Products</span>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-2'>
                        {isSearching ? (
                            // Loading state
                            <div className="flex flex-col justify-center items-center py-20 col-span-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                                {searchQuery && <p className="text-gray-400">Searching for "{searchQuery}"...</p>}
                            </div>
                        ) : (
                            (productsToDisplay.length > 0) ? (
                                productsToDisplay.map((product) => (
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
                                            <p className="text-xl mb-2">No neckbands match "{searchQuery}"</p>
                                            <p className="text-gray-400 mb-6">Try using different keywords or checking your spelling</p>
                                        </>
                                    ) : (
                                        <p>No neckbands found. Try adjusting your filters.</p>
                                    )}
                                    
                                    {(Object.keys(filter).length > 0 || searchQuery) && (
                                        <Button
                                            onClick={clearAllFiltersAndSearch}
                                            className="mt-4 bg-purple-800 hover:bg-purple-700"
                                        >
                                            Clear All Filters & Search
                                        </Button>
                                    )}
                                </div>
                            )
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
            
            {/* Fixed filter button at bottom right */}
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
        </div>
    );
}

export default Neckband;