import { addressFormControls } from "@/config";
import CommonForm from "../common/commonform";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddresses, deleteAddress, editaAddress } from "@/store/Address/Adress-slice";
import { unwrapResult } from '@reduxjs/toolkit';
import Addresscard from "./address-card";

const initialAddressFormData = {
  name: "", // Added name field
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [editid, setEditId] = useState(null);
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
          userId: user?.id
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
      dispatch(fetchAllAddresses(user.id));
    } catch (error) {
      console.error('Failed to delete address: ', error);
    }
  }

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key] !== '').every((item) => item);
  }

  return (
    <div>
      <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
          {addressList.length > 0 ? (
            addressList.map((si) => (
              <Addresscard
                key={si._id}
                adrinfo={si}
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
        <CardContent className="space-y-3 px-12 md:px-64" >
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={editid ? "Update" : "Add"}
            onSubmit={handleManageAddress}
            isButtondis={!isFormValid()}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Address;