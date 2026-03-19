import axios from "axios"

// axios.create() est utilisée pour créer une instance personnalisée d'Axios.
// Configuration de base URL : Vous pouvez définir une URL de base pour toutes les requêtes effectuées à partir de cette instance Axios. Cela vous évite de répéter l'URL de base dans chaque requête.
// Configuration des en-têtes communs : Vous pouvez définir des en-têtes HTTP communs qui seront automatiquement inclus dans toutes les requêtes effectuées à partir de cette instance Axios.
// Configuration des intercepteurs : Vous pouvez ajouter des intercepteurs pour les requêtes et les réponses afin d'effectuer des opérations supplémentaires, telles que l'ajout d'en-têtes, la gestion des erreurs, etc.

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})
