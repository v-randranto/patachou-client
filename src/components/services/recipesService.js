import { apiCall } from '../../api/axios';
import { RESSOURCES_API, METHOD } from '../../constants/api';

const { ACCOUNTS, RECIPES } = RESSOURCES_API;

class RecipesService {
    path = ``;

    createOneRecipe(recipe) {
        return apiCall(this.path, METHOD.PUT, { recipe }).then((data) => {
            return data;
        });
    }
    getAccountRecipes(id) {
        this.path = `${ACCOUNTS}/${id}/${RECIPES}`;
        return apiCall(this.path, METHOD.GET).then((data) => {
          console.log('recipes', data)
            return data;
        });
    }

    getOneRecipe(id) {
        this.path = `${RECIPES}/${id}`;
        return apiCall(this.path, METHOD.GET).then((data) => {
            return data;
        });
    }

    deleteOneRecipe(id) {
        this.path = `${RECIPES}/${id}`;
        return apiCall(this.path, METHOD.DELETE);
    }

    updateOneRecipe(id, update) {
        this.path = `${RECIPES}/${id}`;
        return apiCall(this.path, METHOD.PUT, update).then((data) => {
            return data;
        });
    }

}

export default new RecipesService();