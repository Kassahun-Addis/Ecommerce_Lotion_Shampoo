import React from "react";
import { useTranslation } from "react-i18next";
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  const { t }=useTranslation()
   return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t("form:Entercategory")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
        {t("form:Submit")}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
