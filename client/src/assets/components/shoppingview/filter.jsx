import React, { Fragment } from 'react';
import { filterOptions } from '../../../config/index';
import { Label } from '../ui/Label';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Checkbox } from '../ui/Checkbox';

function ProductFilter({ filter, handlefilter, isMobile, showOnly, excludeSections }) {
    // Determine which sections to show
    const sectionsToRender = showOnly 
        ? Object.keys(filterOptions).filter(section => showOnly.includes(section))
        : Object.keys(filterOptions).filter(section => 
            !excludeSections || !excludeSections.includes(section)
          );

    // If no sections left to render, return null
    if (sectionsToRender.length === 0) return null;

    return (
        <div className={`rounded-lg shadow-sm bg-black ${!isMobile && 'lg:h-screen'} p-2`}>
            {!isMobile && (
                <div className="p-4 border-b">
                    <h2 className="text-lg font-bold text-white">Product Filter</h2>
                </div>
            )}
            <div className='p-4 space-y-4'>
                {
                    sectionsToRender.map((option) => (
                        <Fragment key={option}>
                            <div>
                                <h3 className='text-base font-bold text-white'>{option}</h3>
                                <div className='grid gap-2 mt-2'>
                                    {
                                        filterOptions[option].map(opt => (
                                            <Label key={opt.id} className="flex font-medium items-center gap-2 cursor-pointer">
                                                <div className="relative flex items-center">
                                                    <Checkbox
                                                        checked={
                                                            filter && Object.keys(filter).length > 0 &&
                                                            filter[option] && filter[option].includes(opt.id)
                                                        }
                                                        onCheckedChange={() => handlefilter(option, opt.id)}
                                                        className="form-checkbox h-5 w-5 border-2 border-white bg-transparent checked:bg-white checked:border-white focus:ring-white"
                                                    />
                                                </div>
                                                <span className="text-white ml-2">{opt.label}</span>
                                            </Label>
                                        ))
                                    }
                                </div>
                            </div>
                            {option !== sectionsToRender[sectionsToRender.length - 1] && (
                                <Separator className="bg-gray-700 my-4" />
                            )}
                        </Fragment>
                    ))
                }
            </div>
        </div>
    );
}

ProductFilter.defaultProps = {
    showOnly: null,
    excludeSections: null
};

export default ProductFilter;