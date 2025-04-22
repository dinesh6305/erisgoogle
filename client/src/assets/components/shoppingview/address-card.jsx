import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardFooter } from "../ui/Card";

function Addresscard({ adrinfo, handleEdit, handleDelete, handleSelect, isSelected }) {
    return (
        <div
            onClick={handleSelect} // Trigger handleSelect when the card is clicked
            className={`cursor-pointer ${
                isSelected ? "border-purple-700" : ""
            }`} // Apply a purple border if the card is selected
        >
            <Card className={`bg-gray-900 text-white p-3 lg:w-[350px] lg:p-4 ${isSelected ? "border" : ""}`}>
                <CardContent className="grid gap-4">
                    <Label>Name: {adrinfo?.name}</Label>
                    <Label>Address: {adrinfo?.address}</Label>
                    <Label>City: {adrinfo?.city}</Label>
                    <Label>PinCode: {adrinfo?.pincode}</Label>
                    <Label>Phone.No: {adrinfo?.phone}</Label>
                    <Label>Note: {adrinfo?.notes}</Label>
                </CardContent>
                <CardFooter className="p-3 flex justify-around gap-9 text-white">
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from triggering the parent card selection
                            handleEdit();
                        }}
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center mt-3 py-3 cursor-pointer rounded-lg"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from triggering the parent card selection
                            handleDelete();
                        }}
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center mt-3 py-3 cursor-pointer rounded-lg"
                    >
                        Delete
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Addresscard;