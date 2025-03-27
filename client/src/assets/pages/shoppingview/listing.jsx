import React, { useState, useEffect } from 'react';
import ProductFilter from "../../components/shoppingview/filter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/assets/components/ui/Dropdown';
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon } from 'lucide-react';
import { sortOptions } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '@/store/Adminproduct-slice';
import { fetchAllFilterProducts } from '@/store/shop/shopproduct';
import ShoppingProducttile from '@/assets/components/shoppingview/shoppingproducttile';
import { useSearchParams } from 'react-router-dom';

console.log(sortOptions);

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
    const dispatch = useDispatch()
    const { productList } = useSelector(state => state.shopProducts)
    const [filter, setFilters] = useState({})
    const [sort, setSort] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    function handleSort(value) {
        console.log(value)
        setSort(value)
    }

    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            const queryString = createSearchParamsHelper(filter);
            setSearchParams(new URLSearchParams(queryString));
        }
    }, [filter]);

    console.log(searchParams)

    function handleFilter(getSectionId, getCurrentOption) {
        console.log(getSectionId, getCurrentOption);
        let cpyFilters = { ...filter };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption],
            };
        } else {
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1) {
                cpyFilters[getSectionId].push(getCurrentOption);
            } else {
                cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
            }
        }
        console.log(cpyFilters)
        setFilters(cpyFilters)
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
    }

    useEffect(() => {
        setSort("price-lowtohigh")
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, [])

    useEffect(() => {
        if (filter !== null && sort !== null){
            dispatch(fetchAllFilterProducts({ filterParams: filter, sortParams: sort }));
        }
       
    }, [dispatch,sort,filter])

    console.log(filter)
    console.log(productList)

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6 md:p-6 ">
            <ProductFilter filter={filter} handlefilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">All products</h2>
                    <div className="flex items-center gap-3">
                        <span>{productList.length}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span>SortBy</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px] bg-white">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {
                                        sortOptions.map(sortlist => (
                                            <DropdownMenuRadioItem value={sortlist.id} key={sortlist.id}>
                                                {sortlist.label}
                                            </DropdownMenuRadioItem>
                                        ))
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                    {
                        productList && productList.length > 0 ?
                            productList.map(e => <ShoppingProducttile key={e.id} product={e} />) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default ShoppingListing;