import { createBrowserRouter } from "react-router-dom";
import Root from "Root";
import Home from "screens/Home";
import Movie from "screens/Movie";
import NotFound from "screens/NotFound";
import Search from "screens/Search";
import Tv from "screens/Tv";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "tv",
                element: <Tv/>,
            },
            {
                path: "movie",
                element: <Movie/>,
            },
            {
                path: "search",
                element: <Search/>,
            },

        ],
        errorElement: <NotFound/>,
    }
])
export default router;