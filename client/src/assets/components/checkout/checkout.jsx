import { addressFormControls } from "@/config";
import CommonForm from "../common/commonform";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddresses, deleteAddress, editaAddress } from "@/store/Address/Adress-slice";
import { unwrapResult } from '@reduxjs/toolkit';
import Addresscard from "../shoppingview/address-card";

const initialAddressFormData = {
  name: "",
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Checkout() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [editid, setEditId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null); // State to store the selected address
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { addressList } = useSelector(state => state.shopAddress); // Default to empty array

  async function handleManageAddress(event) {
    event.preventDefault();
    try {
      if (editid) {
        const resultAction = await dispatch(editaAddress({ userId: user.id, addressId: editid, formData }));
        unwrapResult(resultAction);
        setEditId(null);
      } else {
        const resultAction = await dispatch(addNewAddress({
          ...formData,
          userId: user?.id,
        }));
        unwrapResult(resultAction);
      }
      dispatch(fetchAllAddresses(user?.id));
      setFormData(initialAddressFormData);
    } catch (error) {
      console.error('Failed to manage address: ', error);
    }
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddresses(user?.id)).then((result) => {
        const data = unwrapResult(result);
      });
    }
  }, [dispatch, user?.id]);

  function handleEdit(address) {
    setFormData(address);
    setEditId(address._id);
  }

  async function handleDeleteAddress(addressId) {
    try {
      const resultAction = await dispatch(deleteAddress({ userId: user.id, addressId }));
      unwrapResult(resultAction);

      // Clear selectedAddress if it's the one being deleted
      if (selectedAddress?._id === addressId) {
        setSelectedAddress(null);
      }

      dispatch(fetchAllAddresses(user.id));
    } catch (error) {
      console.error('Failed to delete address: ', error);
    }
  }

  function handleSelectAddress(address) {
    setSelectedAddress(address); // Set the selected address
  }

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key] !== '').every((item) => item);
  }

  return (
    <div>
      <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
          {addressList.length > 0 ? (
            addressList.map((si) => (
              <Addresscard
                key={si._id}
                adrinfo={si}
                isSelected={selectedAddress?._id === si._id} // Check if this card is selected
                handleSelect={() => handleSelectAddress(si)} // Handle selection
                handleEdit={() => handleEdit(si)}
                handleDelete={() => handleDeleteAddress(si._id)}
              />
            ))
          ) : (
            <p>No addresses available</p>
          )}
        </div>
        <CardHeader>
          <CardTitle>{editid ? "Edit Address" : "Add New Address"}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 bg-gray-700 text-white">
          <div className="p-5">
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={editid ? "Update" : "Add"}
              onSubmit={handleManageAddress}
              isButtondis={!isFormValid()}
            />
          </div>
        </CardContent>
      </Card>
      {selectedAddress && (
        <div className="mt-5 p-4 bg-gray-900 rounded">
          <h3 className="text-lg font-bold text-white text-center mb-2 underline"><strong className="text-lg">Selected Address:</strong></h3>
          <p className="text-white"><strong>Name:</strong> {selectedAddress.name}</p>
          <p className="text-white"><strong>Address:</strong> {selectedAddress.address}</p>
          <p className="text-white"><strong>City:</strong> {selectedAddress.city}</p>
          <p className="text-white"><strong>Phone:</strong> {selectedAddress.phone}</p>
          <p className="text-white"><strong>Pincode:</strong> {selectedAddress.pincode}</p>
          <p className="text-white"><strong>Notes:</strong> {selectedAddress.notes}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;