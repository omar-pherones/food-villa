import Recipe from './Recipe';

const Favourites = ({ savedItems }) => {
    return (
        <div className="favourite-items-container container mx-auto py-10 flex flex-wrap gap-10 justify-center">
            {savedItems?.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} />
            ))}
            {savedItems.length === 0 && (
                <div>
                    <p className="text-2xl lg:text-4xl font-semibold text-rose-300 text-center pt-10">
                        Favourite list is empty!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Favourites;
