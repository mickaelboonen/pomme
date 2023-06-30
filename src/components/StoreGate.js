// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import { pouet } from 'src/reducer/app'
// import LoaderCircle from 'src/components/LoaderCircle'
// import Pouet from 'src/Pouet'

// const StoreGate = ({children, store, isRehydrated}) => {
  
//   const persist = store.getState()._persist
//   const { rehydrated } = useSelector((state) => state._persist)
  
//   const [isGateOpen, setIsGateOpen] = useState(isRehydrated)
  
//   useEffect(() => {
//     setIsGateOpen(rehydrated);

//   }, [rehydrated])
//   return ( 
//     <>
//       {isGateOpen ? <Pouet />: <LoaderCircle />}
//     </>
//   )
// }

// export default StoreGate
