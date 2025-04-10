function AccordionItem({children, className = ""}) {
    return(
       <div className={{className}}>
             {children}
       </div>
    )
}
export default AccordionItem;