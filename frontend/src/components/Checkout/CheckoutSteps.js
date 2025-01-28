import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import "./style.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order & Pay</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    // {
    //   label: <Typography>Payment</Typography>,
    //   icon: <AccountBalanceIcon />,
    // },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    p: "1rem",
    pb: 0,
    mt: "1rem",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} sx={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              sx={{
                color:
                  activeStep >= index ? "var(--accent)" : "var(--greyLight)",
                fontSize: 14,
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
