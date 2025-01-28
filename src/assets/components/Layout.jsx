import {Link, Outlet} from 'react-router';

function Layout() {
    return (
        <div>
            <header className="bg-gray-800 p-4 shadow-lg fixed top-0 left-0 w-full z-10">
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to={`/`}
                                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/create`}
                                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Create New token
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="pt-16">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;
