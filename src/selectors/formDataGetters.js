export const getAccomodationsDefault = (path) => {

  let data = {

  };
  if (loader.pathname.includes('modifier')) {
    const accomodationsData = omForm.find((omStep) => omStep.step === 'accomodations');

    defaultValues = accomodationsData.data;
  }
  return data;
}
