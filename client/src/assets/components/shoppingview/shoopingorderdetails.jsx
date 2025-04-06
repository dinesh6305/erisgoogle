import { DialogContent } from "@/components/ui/dailog";
import { Label } from "@radix-ui/react-label";
import { Separator } from "../ui/Separator";
import CommonForm from "../common/commonform";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Shoppingorderdetails() {
    return(
        <div>
            <DialogContent className="sm:max-w-[600px]">
                <div className="grid gap-6 p-4">
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <p className="font-medium">OrderID</p>
                            <Label>1234</Label>
                        </div>
                        <div className="flex items-center mt-2 justify-between">
                            <p className="font-medium">OrdeDate</p>
                            <Label>1234</Label>
                        </div>
                        <div className="flex items-center mt-2 justify-between">
                            <p className="font-medium">orderStatus</p>
                            <Label>1234</Label>
                        </div>

                    </div>
                    <Separator />
                    <div className="grid gap-4">
                        <div className="grid gap-5">
                            <div className="font-medium">OrderDetails</div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span>prodcutone</span>
                                    <span>100rs</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-5">
                            <div className="font-medium">Shipping info</div>
                             <div className="grid gap-0.5 teext-muted-foreground">
                                <span>Name</span>
                                <span>City</span>
                                <span>Address</span>
                                <span>Pincode</span>
                                <span>Phone number</span>
                                <span>Note</span>
                             </div>
                        </div>
                    </div>
                    

                </div>
            </DialogContent>
        </div>
    )
    
}

export default Shoppingorderdetails;