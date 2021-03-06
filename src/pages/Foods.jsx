import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import Footer from '../components/Footer';
import CardFood from '../components/CardFood';

import { searchFood } from '../services/TheMealDBApi';
import CategoryBtns from '../components/CategoryBtns';

function Foods() {
  const { data, setData } = useContext(MyContext);
  const doze = 12;

  const handleFood = async () => {
    if (!data.searchResult.length || data.typePage !== 'foods') {
      const { meals } = await searchFood('search', 's', '');
      setData({ searchResult: [...meals], typePage: 'foods' });
    }
  };

  useEffect(() => {
    handleFood();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main_container">
      <Header title="Foods" existeButton="true" />
      <CategoryBtns page="foods" />
      <div className="food_container">
        {
          data.searchResult.map((element, i) => (
            (i < doze) && (
              <CardFood
                element={ element }
                i={ i }
                key={ element.idMeal }
              />
            )
          ))
        }
      </div>
      <Footer existeFooter="true" />
    </div>
  );
}

export default Foods;
