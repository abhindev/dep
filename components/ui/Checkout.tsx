import React, { useState, useEffect } from 'react'
import createOred from '../createOred'
import createPayment from "../createPayment"
import { useRouter } from 'next/router'
import { useSelector,useDispatch } from 'react-redux'
import { reset } from "../../redux/cartSlice";

import styles from "../../styles/Checkout.module.css"
import useWindowDimensions from '../hooks/useWindowDimensions'

interface FormErrors {
  name?: any;
  email?: any;
  address?: any;
  state?: any;
  city?: any;
  phone?: any;
  phone2?: any;
  pincode?: any;
  // Add other form field error properties here
}

function Checkout() {
  const router = useRouter()
  const cart = useSelector((state:any) => state.cart);
  const dispatch = useDispatch();
  console.log(cart.total)
  const num = cart.total+50
  const cartTotal = num.toString()
  const { width ,height } = useWindowDimensions();
  const h =(height)
  // console.log(numstring)
  /////////////states//////////////////////
  const [orderId, setOrderId ]= useState("")

  const [customername, setCustomername] = useState("")
  const [customemail, setCustomemail] = useState("")
  const [customeraddress, setCustomeraddress] = useState("")
  const [customercity,setCustomerCity] =useState("")
  const [ customerstate,setCustomerState] =useState("")
  const [ customerpincode,setCustomerPincode] =useState("")
  const [ customerphone,setCustomerPhone] =useState("")
  const [ customerphone2,setCustomerPhone2] =useState("")
  
  ///////////////states end /////////////////////
  /////////////validation////////////////////
  const initialValues = { name: "",email:"", address: "", city: "", state: "",pincode: "", phone: "", phone2: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading ,setLoading] =useState(false)

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues.name);
      setCustomername(formValues.name)
      setCustomemail(formValues.email)
      setCustomeraddress(formValues.address)
      setCustomerCity(formValues.city)
      setCustomerState(formValues.state)
      setCustomerPincode(formValues.pincode)
      setCustomerPhone(formValues.phone)
      setCustomerPhone2(formValues.phone2)
    }
  }, [formErrors]);
  const validate = (values:any) => {
    const errors: FormErrors  = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name= "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    } 
    if (!values.city) {
      errors.city = "city is required";
    } 
    if (!values.state) {
      errors.state = "state is required";
    } 
    if (!values.pincode) {
      errors.pincode = "pincode is required";
    } 
    if (!values.phone) {
      errors.phone = "phone is required";
    } 
    if (!values.phone2) {
      null
    } else if (values.phone2.length <10) {
      errors.phone2 = "phone must be  10 characters";
    }
    return errors;
  };
  /////////////validation---end////////////////////
  /////////////create oreder//////////////////////

  const customer = customername
  const email = customemail
  const Address = customeraddress
  const City = customercity
  const State = customerstate
  const pinCode = customerpincode 
  const phone =  customerphone 
  const phone2 = customerphone2
  const item = cart
  const total = cartTotal
  /////////////////////////
  const order_id = orderId
  const order_amount = total
  const customer_id = "customer_"+Date.now()
  const customer_name = customer
  const customer_email = email
  const customer_phone = phone
  ////////////////////////////
  
  const handilClick=()=>{
    createOred(customer, Address, City,State,pinCode, phone , phone2, item, total)
  .then(function(result) {
    console.log(result.data._id); // "initResolve"
    setOrderId(result.data._id)
    //loading
    setLoading(true)
    //loadingend
    const order_id = result.data._id
    // handilClickBuy()
    createPayment(
      order_id,
      order_amount,
      customer_id,
      customer_name,
      customer_email,
      customer_phone
  )
     .then(function(result) {
       console.log(result.data); // "initResolve"
       console.log(result.data.payment_link)
       router.push(result.data.payment_link)
       dispatch(reset());

       return "normalReturn";
     })
    return "normalReturn";
  })
  } 
  // Object.keys(formErrors).length === 0 && isSubmit ?(handilClick)  : null
  ////////////////create order end////////////////
//////////////////pay///////////////////////


    
  /////////////////pay-end////////////////
  const Conform=()=>{
    setTimeout(function() {
      window.scrollTo(0,h);
    }, 1);
    
  }
  return (
    <div className={styles.container}>

      <form onSubmit={handleSubmit}>
      <h1 className={styles.title}>Contact Information</h1>
      
      <div className={styles.ui_form}>
        <div className={styles.field}>
          {/* <label>Username</label> */}
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <p className={styles.error}>{formErrors.name}</p>
        <div className={styles.field}>
          {/* <label>email</label> */}
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <p className={styles.error}>{formErrors.name}</p>
        <div className={styles.field}>
          {/* <label>phone</label> */}
          <input
            className={styles.input}
            type="number"
            name="phone"
            placeholder="phone"
            value={formValues.phone}
            onChange={handleChange}
          />
        </div>
        <p className={styles.error}>{formErrors.phone}</p>
        <h1 className={styles.title}>Shipping address</h1>
        <div className={styles.field}>
          {/* <label>address</label> */}
          <input
            className={styles.input}
            type="text"
            name="address"
            placeholder="Address"
            value={formValues.address}
            onChange={handleChange}
          />
        </div>
        <p className={styles.error}>{formErrors.address}</p>
        <div className={styles.field}>
          {/* <label>ciity</label> */}
          <input
            className={styles.input}
            type="text"
            name="city"
            placeholder="city"
            value={formValues.city}
            onChange={handleChange}
          />
        </div>
        <p className={styles.error}>{formErrors.city}</p>
        <div className={styles.field}>
          {/* <label>State</label> */}
          <input
            className={styles.input}
            type="text"
            name="state"
            placeholder="state"
            value={formValues.state}
            onChange={handleChange}
          />
        </div>
        <p className={styles.error}>{formErrors.state}</p>
        <div className={styles.field}>
          {/* <label>pincode</label> */}
          <input
            className={styles.input}
            type="number"
            name="pincode"
            placeholder="pincode"
            value={formValues.pincode}
            onChange={handleChange}
          />
        </div>
        <p className={styles.error}>{formErrors.pincode}</p>
        
        <div className={styles.field}>
    
          <input
            className={styles.input}
            type="number"
            name="phone2"
            placeholder="phone"
            value={formValues.phone2}
            onChange={handleChange}
          />
        </div>
        <p className={styles.error}>{formErrors.phone2}</p>
        
        {Object.keys(formErrors).length === 0 && isSubmit ? (
      <>
      <div className={styles.btn}>
      <button className={styles.button} onClick={()=>handilClick()}>conform</button>
      </div> 
      {/* <button onClick={()=>Conform()}>propst</button> */}
      </>
    ) : (
        <div className={styles.btn}>
         <button className={styles.button}>Submit</button> 
        </div>)}


      </div>
    </form>
    {loading==true?<div className={styles.loading_container}>
      <div className={styles.loading}></div>
    </div>:null}
    
  </div>
  )
}

export default Checkout