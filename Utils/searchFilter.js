export default searchFilter = (search, data, fields) => {
    try {
        
        if (!data || data.length === 0) {
            return data;
        }

        const searchValue = search.toLowerCase().trim();

        if (searchValue === "") {
            return data;
        }

        return data.filter(item =>
            fields.some(field => {
                const fieldPath = field.split(".");
                let value = item;

                for (let i = 0; i < fieldPath.length; i++) {
                    if (value && Object.prototype.hasOwnProperty.call(value, fieldPath[i])) {
                        value = value[fieldPath[i]];
                    } else {
                        value = null;
                        break;
                    }
                }

                return value?.toString().toLowerCase().includes(searchValue);
            })
        );

    } catch (error) {
        return data
    }
};
