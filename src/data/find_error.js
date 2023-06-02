export function Error_Alltab(items){
    try{
        return items.lenght
    }
    catch(TypeError){
        return 1
    }

}
export function FixTypeError(items){
    try{
        return items
    }
    catch(TypeError){
        return 0
    }

}