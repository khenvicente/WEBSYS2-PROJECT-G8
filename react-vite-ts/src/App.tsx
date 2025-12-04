import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FamiliarsPage from "./pages/FamiliarsPage"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <Routes>
            {/* <Route path="/customers" element={<CustomersPage />} /> */}
            <Route path="/familiars" element={<FamiliarsPage />} />
            {/* <Route path="/groups" element={<GroupsPage />} />
            <Route path="/wizards" element={<WizardsPage />} />
            <Route path="/contracts" element={<ContractsPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
    // <div className="w-auto h-auto m-6 border-0 bg-gray-900 shadow-md shadow-gray-900">
    //   <FamiliarsPage />
    // </div>
    // <div>
    //   <div className="w-auto h-100 m-6 border-0 shadow-md shadow-gray-500">
    //     <button
    //       className="size-auto border-2 border-amber-500 text-amber-500"
    //       onClick={familiarHook.getAllFamiliars}
    //     >
    //       Get All Familiars
    //     </button>
    //     <div className="mt-4">
    //       {familiarHook.familiars.map(familiar => (
    //         <div className="mb-2">
    //           <span className="font-bold">
    //             Name:
    //             {familiar.name}  
    //           </span>
    //           {familiar.types.map((type: string) => {
    //             <span
    //               key={type}
    //               className="inline-block mr-2 px-2 py-1 bg-blue-100 text-blue-700 rounded"
    //             >
    //               {type}
    //             </span>
    //           })}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="w-auto h-100 m-6 border-0 shadow-md shadow-gray-500">
    //     <button
    //       className="size-auto border-2 border-amber-500 text-amber-500"
    //       onClick={groupHook.getAllGroups}
    //     >
    //       Get All Groups
    //     </button>
    //   </div>
    //   <div className="w-auto h-100 m-6 border-0 shadow-md shadow-gray-500">
    //     <button
    //       className="size-auto border-2 border-amber-500 text-amber-500"
    //       onClick={contractHook.getAllContracts}
    //     >
    //       Get All Contracts
    //     </button>
    //   </div>
    // </div>
  )
}

export default App
