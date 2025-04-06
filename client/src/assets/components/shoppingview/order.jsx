import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/Dialog";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/Button";
import Shoppingorderdetails from "./shoopingorderdetails";

function Orders() {
    const[opend,setOPenD]=useState(false)
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Orders History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Order Price</TableHead>
                                <TableHead>
                                    <span className="sr-only">Details</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Add your table rows here */}
                            <TableRow>
                                <TableCell>12345</TableCell>
                                <TableCell>2025-03-28</TableCell>
                                <TableCell>Shipped</TableCell>
                                <TableCell>$100</TableCell>
                                <TableCell>
                                    <Dialog open={opend} onOpenChange={setOPenD}>
                                    <Button className="bg-purple-700 text-white" onClick={()=>setOPenD(true)}>View Details</Button>
                                      <Shoppingorderdetails/>
                                    </Dialog>
                                   
                                </TableCell>
                            </TableRow>
                            {/* Add more rows as needed */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default Orders;