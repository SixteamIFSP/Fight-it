import { FontAwesome } from "@expo/vector-icons";
import { ContainerButtonAdd } from "./styles";

export function AddButton({handle}){
    return(
        <ContainerButtonAdd onPress={()=>handle()}>
            <FontAwesome name="plus" size={20} color="black" />
        </ContainerButtonAdd>
    )
}