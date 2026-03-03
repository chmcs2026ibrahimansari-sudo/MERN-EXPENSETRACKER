import { Wallet, WalletIcon } from 'lucide-react'
import React from 'react'
import {Link} from 'react-router-dom'
const ExpenseNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16space-y-6 max-w-md mx-auto text-center'>
      <div className='bg-primary/10 rounded-full p-8'>
      <WalletIcon className='size-10 text-primary' />
      </div>
      <h3 className='text-2xl font-bold'>No EXPENSE yet</h3>
      <p className='text-base-content/70'>
      Ready to add EXPENSE? Add first EXPENSE to the TRACKER</p>
      <Link to='/create' className='btn btn-primary'>
      Add First EXPENSE to the EXPENSETRACKER</Link>
    </div>
    
  )
}
export default ExpenseNotFound;