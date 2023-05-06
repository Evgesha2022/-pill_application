import React from "react";
import {MarkedList, MarkedItem, IconDone, Card, Image} from "@salutejs/plasma-ui";
import {
    CardContent,
    Cell, CellDisclosure,
    CellIcon,
    CellListItem,
    TextBox,
    TextBoxBigTitle, TextBoxSubTitle,
    TextBoxTitle
} from "@sberdevices/plasma-ui";
import {IconDownload} from "@sberdevices/plasma-icons";
import {IconLocationFill} from "@salutejs/plasma-icons";

const BusRoute = ({ routeName, stops }) => {
    return (




        <Card style={{ width: '22.5rem', marginLeft: '0.75rem' }}>
            <CardContent compact>
                <Cell
                    content={<TextBoxBigTitle>{routeName}</TextBoxBigTitle>}
                    contentRight={<span style={{ marginTop: 5 }}>Detail</span>}
                />
                {stops.map((stop, index) => (
                    // <li key={index}>{stop}</li>
                    <CellListItem
                        contentLeft={
                            <CellIcon>
                                <Image src={"Frame 1.svg"}/>

                            </CellIcon>
                        }
                        content={
                            <TextBox>
                                <TextBoxTitle>{stop}</TextBoxTitle>
                            </TextBox>
                        }
                        contentRight={<CellDisclosure />}
                    />
                ))}

            </CardContent>
        </Card>
    );
};

export default BusRoute;
