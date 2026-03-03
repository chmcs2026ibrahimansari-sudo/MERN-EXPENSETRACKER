import React from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AddExpensePage from "./pages/AddExpensePage"
import MonthlyExpensesPage from "./pages/MonthlyExpensesPage"
import CategoryWisePage from "./pages/CategoryWisePage"
import ExpenseDetailPage from './pages/ExpenseDetailspage'
const App = () => {
  return (
    <div data-theme="luxury" className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
       [background:radial-gradient (125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]'/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddExpensePage />} />
        <Route path="/monthly" element={<MonthlyExpensesPage />} />
        <Route path="/category" element={<CategoryWisePage />} />
        <Route path="/expense/:id" element={<ExpenseDetailPage/>} />
        

      </Routes>
    </div>
  )
}

export default App