
import Orders from "@/assets/components/shoppingview/order";
import accimg from "../../images/account.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Address from "@/assets/components/shoppingview/address";


function ShoppingAcc() {
    return (
        <div className="flex flex-col">
            <div className="mt-22">
                <img src={accimg}
                 className="h-full w-full object-cover object-center"/>
               
                
            </div>
            <div className="container mx-auto grid grid-cols-1  py-8">
            <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
            <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                <Orders/>
              
            </TabsContent>
            <TabsContent value="address">
                <Address/>
              
            </TabsContent>
            </Tabs>
            </div>

            </div>
       

        </div>
    );
}

export default ShoppingAcc;