import Button from "../../components/Button";
import logoM from "../../assets/images/simbolo-color.png"
import logoD from "../../assets/images/logo-color.png"
import {Container,ImagemD,ImagemM,SectionB} from "./styles"
import { useHistory } from "react-router";
const LandingPage = () => {
    const history = useHistory();
    
    return (
         <Container>
             <ImagemM alt="logo" src={logoM}></ImagemM>
             <ImagemD alt="logo" src={logoD}></ImagemD>
             <SectionB>
             <Button onClick={() => history.push("/login")}>LOGIN</Button>
             <Button onClick={() => history.push("/signup")}>SIGNUP</Button>
             </SectionB>
         </Container>
    )
} 
export default LandingPage;