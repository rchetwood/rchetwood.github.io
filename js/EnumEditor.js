function EnumEditor(cl){
    let cl = cl
    return{
        getTags: () =>{
            try{
                //unsure what to do for this line
                // @SuppressWarnings("unchecked") 
                //Object[] values = (Object[]) cl.getMethod("values").invoke(null);
                let values = []
                values = cl.values()
                let result = []
                for(let i = 0; i < values.length; i++){
                    result[i] = values[i].toString()
                }
                return result
            }
            catch(err){
                return undefined
            }
        }
    }
}