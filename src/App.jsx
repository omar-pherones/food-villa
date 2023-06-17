import { Routes, Route } from 'react-router-dom';
import { useRef, useState } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Favourites from './components/Favourites';
import RecipeItem from './components/RecipeItem';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputFildRef = useRef(null);
    // search handaler form submite event
    const searchHandaler = (e) => {
        e.preventDefault();
        getData(searchQuery);
        // input Fild claer
        inputFildRef.current.blur();
        setSearchQuery('');
        // All recipes reset
        setRecipes([]);
    };
    // Getting into server data finder
    // Getting into server data finder
    const getData = async (searchQuery) => {
        try {
            setLoading(true);
            const res = await fetch(
                `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
            );
            if (!res.ok) throw new Error('Somthing went wrong!');
            const data = await res.json();
            if (data.results === 0) throw new Error('No recipe found!');
            setRecipes(data?.data?.recipes);
            setLoading(false);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="app min-h-screen bg-rose-50 text-gray-600 text-lg">
                <Navbar
                    searchQuery={searchQuery}
                    searchHandaler={searchHandaler}
                    inputFildRef={inputFildRef}
                    setSearchQuery={setSearchQuery}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                recipes={recipes}
                                loading={loading}
                                error={error}
                            />
                        }
                    />
                    <Route path="/favourites" element={<Favourites />} />
                    <Route path="/recipe-item/:id" element={<RecipeItem />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
