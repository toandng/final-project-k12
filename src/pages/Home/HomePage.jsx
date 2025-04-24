import { Accordion, AccordionItem } from "@/components/Accordion";
import { Tab, Tabs } from "@/components/Tabs";
import ListItem from "@/components/ListItems";
import ActiveUser from "@/components/ActiveUser";
export default function HomePage() {
  return (
    <div>
      <ActiveUser />
      <Tabs
        defaultIndex={0}
        onChange={(index) => console.log(index)}
        className="border"
        tabListclassName="flex gap-2"
        tabsButtonClassName="px-4 py-2"
        activeTabButtonClassName="text-red-500 font-bold"
      >
        <Tab title="Tab 1">Content of Tab 1</Tab>
        <Tab title="Tab 2">Content of Tab 2</Tab>
        <Tab title="Tab 3">Content of Tab 3</Tab>
        <Tab title="Tab 4">Content of Tab 4</Tab>
        <Tab title="Tab 5">Content of Tab 5</Tab>
      </Tabs>

      <Accordion
        defaultIndex={0}
        onChange={(index) => console.log("mở", index)}
        collapseOthers={true}
      >
        <AccordionItem header="Accordion 1">
          {" "}
          Nội dung của Accordion 1
        </AccordionItem>
        <AccordionItem header="Accordion 2">
          {" "}
          Nội dung của Accordion 2
        </AccordionItem>
        <AccordionItem header="Accordion 3">
          {" "}
          Nội dung của Accordion 3
        </AccordionItem>
      </Accordion>
      <ListItem />
    </div>
  );
}
