import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminServices from "./adminServices";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";

export default function ProductEditModal({ showModal, setShowModal, product }) {
    const [newProduct, setNewProduct] = useState({ ...product });

    const [isFormFilled, setIsFormFilled] = useState(false)

    const handleIsFormFilled = () => {
        for (const key in newProduct) {
            if (key !== 'rating' && newProduct[key] === product[key])
                return true
        }
        return false
    }

    useEffect(() => {
        if (showModal) {
            setNewProduct({ ...product });
        }
    }, [product, showModal]);

    const handleNewProduct = (field, e) => {
        let value = e.target.value;

        if (field === 'stock' && value.includes('.')) {
            document.getElementById('stock_input').value = value.substring(0, value.indexOf('.'))
            document.getElementById('stock_input').blur()

            return;
        } else {
            const x = newProduct
            value = value.split(' ').map(word => {return word.charAt(0).toUpperCase() + word.slice(1)}).join(' ')
            x[field.toLowerCase()] = value
            setNewProduct(x)
            setIsFormFilled(handleIsFormFilled())
        }
    };

    const SubmitChanges = async () => {
        const response = await AdminServices.EditProduct(JSON.parse(localStorage.getItem('Authorization')), newProduct)
        if (response) {
            window.location.reload()
        } 
        setShowModal(false)
    }
        
    const FormInputComponent = ({ label, placeholder, type = 'text' }) => {
        const lowerLabel = label.toLowerCase();
        const id = lowerLabel + '_input';

        return (
            <div className="p-2 my-1 w-full">
                <label htmlFor={id} className="text-md">
                    {label}
                    <span className="text-[#dd2c2c]">*</span>
                </label>

                {lowerLabel === 'gender' ? (
                    <select
                        name={id}
                        id={id}
                        defaultValue={newProduct[lowerLabel]}
                        onChange={(e) => handleNewProduct(lowerLabel, e)}
                        className="block border w-full h-[32px] rounded-md"
                    >
                        <option value="Other">Other</option>
                        <option value="Men's">Men's</option>
                        <option value="Women's">Women's</option>
                    </select>
                ) : (
                    <input
                        name={id}
                        id={id}
                        type={type}
                        min={0}
                        placeholder={placeholder}
                        defaultValue={newProduct[lowerLabel]}
                        required
                        onChange={(e) => handleNewProduct(lowerLabel, e)}
                        className="block border p-1 h-[32px] rounded-md"
                        disabled={lowerLabel === 'rating'}
                    />
                )}
            </div>
        );
    };

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit Product Inventory
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-[#272f29] opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-[#272f29] opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form>
                                        <fieldset className="border my-4">
                                            <legend className="ml-2 text-lg font-medium">Product Names</legend>
                                            <div className="flex ">
                                                <FormInputComponent label={'Brand'} placeholder={''} />  
                                                <FormInputComponent label={'Name'} placeholder={''} />  
                                            </div>
                                        </fieldset>
                                        <fieldset className="border my-4">
                                            <legend className="ml-2 text-lg font-medium">Features</legend>
                                            <div className="flex">
                                                <FormInputComponent label={'Size'} placeholder={''} type="number"/>  
                                                <FormInputComponent label={'Colour'} placeholder={''} />  
                                            </div>
                                            <div className="flex">
                                                <FormInputComponent label={'Category'} placeholder={''} />  
                                                <FormInputComponent label={'Rating'} placeholder={''} />  
                                            </div>
                                            <div className="flex">
                                                <FormInputComponent label={'Gender'} placeholder={''} />  
                                            </div>
                                        </fieldset>
                                        <fieldset className="border my-4">
                                            <legend className="ml-2 text-lg font-medium">Stock Info</legend>
                                            <div className="flex">
                                                <FormInputComponent label={'Stock'} placeholder={''} type="number" />  
                                                <FormInputComponent label={'Price'} placeholder={''} type="number"/>  
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-[#dd2c2c] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className={`${!isFormFilled ? 'bg-gray-200' : 'bg-[#272f29]'} text-white active:bg-[#272f29] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                        type="button"
                                        onClick={() => SubmitChanges()}
                                        disabled={!isFormFilled}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
