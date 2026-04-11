export function getCategoryData(transactions:any[]) {
return Object.values(
transactions
.filter(t=>t.type==="expense")
.reduce((acc:any,t:any)=>{

if(!acc[t.category]){
acc[t.category] = {name:t.category,value:0}
}

acc[t.category].value += Number(t.amount)

return acc

},{})
)
}