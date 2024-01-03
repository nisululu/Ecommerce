import React, {Fragment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShippingFast, faSquareCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import Stepper from '@mui/material/Stepper'
import { Step, StepLabel } from '@mui/material'
import './CheckoutSteps.css'

const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            label: "Shipping Details",
            icon: <FontAwesomeIcon icon={faShippingFast} />
        },
        {
            label: "Confirm Order",
            icon: <FontAwesomeIcon icon={faSquareCheck} />
        },
        {
            label: "Payment",
            icon: <FontAwesomeIcon icon={faCreditCard} />
        }
    ]

    const stepStyles = {
        boxSizing: "border-box",
        width: "50%",
        margin: "auto",
        marginTop: "40px",
        // marginBottom: "10px"
    }

  return (
    <Fragment>
        <Stepper activeStep={activeStep} alternativeLabel style={stepStyles}>
        {
            steps.map((item,index) => (
                <Step 
                key={index} 
                active={activeStep === index ? true : false}
                completed={activeStep >= index ? true : false}
                >
                    <StepLabel 
                    icon={item.icon}
                    style={{
                        color: activeStep >= index ? " #00a676" : "rgba(0,0,0,0.7)"
                    }}
                    >{item.label}</StepLabel>
                </Step>
            ))
        }
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps
