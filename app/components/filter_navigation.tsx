const FilterNavigation = () => {
  return (
    <nav>
      <div className="container">
        <div className="filter">
          <div className="label">
            Filter By:
            <span>
              <p>All</p>
              <svg 
                className="arrow"
                width="12" 
                height="12" 
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M2.5 4.5L6 8L9.5 4.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FilterNavigation;
