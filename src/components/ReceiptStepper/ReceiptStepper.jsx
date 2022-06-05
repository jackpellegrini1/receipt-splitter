import { Button, Step, StepLabel, Stepper } from '@mui/material'
import React, { useState } from 'react'
import ItemsForm from '../Forms/ItemsForm/ItemsForm';
import PeopleForm from '../Forms/PeopleForm/PeopleForm';
import TaxTipForm from '../Forms/TaxTipForm/TaxTipForm';
import Results from '../Results/Results';

export default function ReceiptStepper() {

  const [activeStep, setActiveStep] = useState(0);
  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]);
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);

  /**
   * STATE MANAGEMENT
   */

  const addPerson = (person) => {
    setPeople(prev => [...prev, person]);
  }

  const deletePerson = (person) => {
    setPeople(prev => [...prev].filter(i => i !== person))
  }

  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  }

  const deleteItem = (item) => {
    setItems(prev => [...prev].filter(i => i !== item))
  }

  const editItem = (item, index) => {
    setItems(prev => {
      const itemsCopy = [...prev];
      itemsCopy[index] = item;
      return itemsCopy
    })
  }

  /**
   * NAVIGATION
   */
  const _handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const _handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const _startAgain = () => {
    setPeople([]);
    setItems([]);
    setTax(0);
    setTip(0);
    setActiveStep(0);
  }

  const _disablePeopleNext = () => {
    return people.length === 0
  }

  const _disableItemsNext = () => {
    if (items.length === 0) {
      return true;
    }
    let disabled = false;
    items.forEach(item => {
      if (item.selectedPeople.length === 0) {
        disabled = true;
      }
    })
    return disabled;
  }

  const _renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <PeopleForm people={people} addPerson={addPerson} deletePerson={deletePerson} />;
      case 1:
        return <ItemsForm items={items} people={people} addItem={addItem} deleteItem={deleteItem} editItem={editItem} />;
      case 2:
        return <TaxTipForm tax={tax} setTax={setTax} tip={tip} setTip={setTip} />;
      case 3:
        return <Results people={people} items={items} tax={tax} tip={tip} />
      default:
        return <div>Not Found</div>;
    }
  }

  const _renderPreviousButton = (step) => {
    return <Button variant="contained" onClick={_handleBack} disabled={activeStep === 0}>Previous</Button>
  }

  const _renderNextButton = (step) => {
    switch (step) {
      case 0:
        return <Button variant="contained" onClick={_handleNext} disabled={_disablePeopleNext()}>Next</Button>
      case 1:
        return <Button variant="contained" onClick={_handleNext} disabled={_disableItemsNext()}>Next</Button>
      case 2:
        return <Button variant="contained" onClick={_handleNext}>Finish</Button>
      case 3:
        return <Button variant="contained" onClick={_startAgain}>Start Again</Button>
      default:
        return null;
    }
  }

  return (
    <>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>People</StepLabel>
        </Step>
        <Step>
          <StepLabel>Items</StepLabel>
        </Step>
        <Step>
          <StepLabel>Tax and Tip</StepLabel>
        </Step>
        <Step>
          <StepLabel>Results</StepLabel>
        </Step>
      </Stepper>
      <div className='padding10'>
        {_renderStepContent(activeStep)}
      </div>
      <div className="row">
        <div>
          {_renderPreviousButton(activeStep)}
        </div>
        <div>
          {_renderNextButton(activeStep)}
        </div>
      </div>
    </>
  )
}
