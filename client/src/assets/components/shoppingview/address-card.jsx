import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter } from "../ui/Card";

function Addresscard({ adrinfo, handleEdit, handleDelete }) {
    return (
        <div>
            <Card className="bg-gray-800  text-white p-3 lg:w-[350px] lg:p-4 ">
                <CardContent className="grid gap-4">
                <Label>Address: {adrinfo?.name}</Label>
                    <Label>Address: {adrinfo?.address}</Label>
                    <Label>City: {adrinfo?.city}</Label>
                    <Label>PinCode: {adrinfo?.pincode}</Label>
                    <Label>Phone.No: {adrinfo?.phone}</Label>
                    <Label>Note: {adrinfo?.notes}</Label>
                </CardContent>
                <CardFooter className="p-3 flex justify-around gap-9 text-white">
                    <button onClick={handleEdit} className="w-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center mt-3 py-3 cursor-pointer rounded-lg">Edit</button>
                    <button onClick={handleDelete} className="w-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center mt-3 py-3 cursor-pointer rounded-lg">Delete</button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Addresscard;