/*
This file is the view for the navbar. It will be used to display the navbar on the screen.
You should be able to navigate to the other pages from the navbar. 
*/

/*
The navbar will be a vertical navbar on the left side of the screen.
*/

function NavbarView() {
	return (
		<div className="flex-col flex-auto w-min">
			<div className="flex-col flex-auto bg-slate-500">       
				<div>
					Dashboard
				</div>
        <div>
          Workout Plan
        </div>
        <div>
          Progression 
        </div>
        <div>
          Explore page
        </div>
        <div>
          Settings
        </div>
			</div>
		</div>
	);
}

export default NavbarView;
