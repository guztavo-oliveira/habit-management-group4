import { createContext, useContext } from "react";
import Alimentação from '../assets/images/alimentacao.png'
import Economia from '../assets/images/economia.png'
import Saude from '../assets/images/saude.png'
import Estudos from '../assets/images/estudos.png'
import SaudeMental from '../assets/images/saude-mental.png'
import Sono from '../assets/images/sono.png'
import InteracaoSocial from '../assets/images/interacao-social.png'

const CategoryOptionsContext = createContext({});

export const useCategoryOptions = () => {
  const context = useContext(CategoryOptionsContext);
  return context;
};

export const CategoryOptionsProvider = ({ children }) => {
  const categoryOptions = [
    { name: "Economia", value: "Economia" },
    { name: "Saúde", value: "Saúde" },
    { name: "Estudos", value: "Estudos" },
    { name: "Alimentação", value: "Alimentação" },
    { name: "Saúde Mental", value: "Saúde Mental" },
    { name: "Sono", value: "Sono" },
    { name: "Interação Social", value: "Interação Social" },
  ];

  const categoryImages = [
    { name: "Economia", image: Economia },
    { name: "Saúde", image: Saude },
    { name: "Estudos", image: Estudos },
    { name: "Alimentação", image: Alimentação },
    { name: "Saúde Mental", image: SaudeMental },
    { name: "Sono", image: Sono},
    { name: "Interação Social", image: InteracaoSocial },
  ];
  return (
    <CategoryOptionsContext.Provider value={{ categoryOptions, categoryImages }}>
      {children}
    </CategoryOptionsContext.Provider>
  );
};
