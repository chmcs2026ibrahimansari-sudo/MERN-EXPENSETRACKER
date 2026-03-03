import { Link } from "react-router-dom";
import { PlusIcon, CalendarDays, PieChart } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-100 border-b border-base-content/10">
      <div className="ms-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">

          {/* Title */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            EXPENSE TRACKER
          </h1>

          {/* Buttons */}
          <div className="flex items-center gap-4">

            <Link to="/add" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>Add Expense</span>
            </Link>

            <Link to="/monthly" className="btn btn-outline btn-primary">
              <CalendarDays className="size-5" />
              <span>Monthly</span>
            </Link>

            <Link to="/category" className="btn btn-outline btn-primary">
              <PieChart className="size-5" />
              <span>Category</span>
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
