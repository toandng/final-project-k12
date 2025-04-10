import {Tabs, Tab} from "../../components/Tabs/index"
function History() {
    return(
        <div>
        <Tabs
           defaultIndex = {0} 
           onChange = {(index) => console.log(index)}
          
       >
         <Tab title = "Hoành thành">Hoàn thành</Tab>
         <Tab title = "Đã hủy">Đã hủy</Tab>
         
     </Tabs>
 
     </div>
    )
}
export default History;