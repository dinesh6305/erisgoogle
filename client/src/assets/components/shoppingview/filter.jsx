import React, { Fragment } from 'react';
import { filterOptions } from '../../../config/index';
import { Label } from '../ui/Label';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Checkbox } from '../ui/Checkbox';

function ProductFilter({ filter, handlefilter }) {
    return (
        <div className="bg-background rounded-lg shadow-sm bg-black mt-20">
            <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-white">Product Filter</h2>
            </div>
            <div className='p-4 space-y-4'>
                {
                    Object.keys(filterOptions).map((option) => (
                        <Fragment key={option}>
                            <div>
                                <h3 className='text-base font-bold'>{option}</h3>
                                <div className='grid gap-2 mt-2'>
                                    {
                                        filterOptions[option].map(opt => (
                                            <Label key={opt.id} className="flex font-medium items-center gap-2">
                                                <Checkbox
                                                checked={
                                                    filter && Object.keys(filter).length > 0 &&
                                                    filter[option] && filter[option].includes(opt.id)
                                                }
                                                onCheckedChange={() => handlefilter(option, opt.id)} />
                                                {opt.label}
                                            </Label>
                                        ))
                                    }
                                </div>
                            </div>
                            <Separator />
                        </Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default ProductFilter;