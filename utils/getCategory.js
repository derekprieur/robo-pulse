export const getCategory = (title, description) => {
    const titleLowerCase = title.toLowerCase();
    const descriptionLowerCase = description.toLowerCase();
    const categories = ['Robotics', 'Artificial Intelligence', 'Machine Learning', 'Automation'];

    for (const category of categories) {
        const categoryLowerCase = category.toLowerCase();
        if (titleLowerCase.includes(categoryLowerCase) || descriptionLowerCase.includes(categoryLowerCase)) {
            return category;
        }
    }
    return null;
};
