import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Table, Row, Col, CardBody, CardHeader, Container, FormGroup, Input, Alert } from 'reactstrap';
import classnames from 'classnames';
import { ListGroup, ListGroupItem } from 'reactstrap';

import UserHeader from "components/Headers/UserHeader.js";
import "../index.css"
import FileBase64 from '../base64';
import { get, post } from "../../request/request"

import { NavLink as NavLinkRRD, Link } from "react-router-dom";

const Example = ({ }) => {
    const [activeTab, setActiveTab] = useState('2');

    const [youtubeLink1, setYoutubeLink1] = useState("")
    const [videoTitle1, setVideoTitle1] = useState("")
    const [videoImage1, setVideoImage1] = useState("")

    const [youtubeLink2, setYoutubeLink2] = useState("")
    const [videoTitle2, setVideoTitle2] = useState("")
    const [videoImage2, setVideoImage2] = useState("")


    const [youtubeLink3, setYoutubeLink3] = useState("")
    const [videoTitle3, setVideoTitle3] = useState("")
    const [videoImage3, setVideoImage3] = useState("")

    const [salseManeYoutubeLink, setSalseManeYoutubeLink] = useState("")
    const [salseManeTitle, setSalseManeTitle] = useState("")
    const [salseManeImage, setSalseManeImage] = useState("")

    const [marckettingYoutubeLink, setMarckettingYoutubeLink] = useState("")
    const [homeSlider, seHomeSlider] = useState("")
    const [imgList, setImgsList] = useState([])
    const [homeVideosList, setHomeVideosList] = useState([])
    const [salseManeVideoList, setSalseManeVideoList] = useState([])
    const [salseManeLoader, setSalseManeLoader] = useState(false)




    useEffect(() => {
        get("dashbordImages/get")
            .then(({ data }) => {
                if (data) {
                    setImgsList(data.data)
                }

            })
        get("home/get")
            .then(({ data }) => {
                setHomeVideosList(data.videos)

            }).catch(({ res }) => {
                console.log(res)
            })


        get("slaseman-help/get")
            .then(({ data }) => {
                console.log(data)
                setSalseManeVideoList(data.videos)

            }).catch(({ res }) => {
                console.log(res)
            })



    }, [])



    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }





    const saveHomeLink = () => {
        let arr = [videoImage1, videoImage2, videoImage3];
        if (youtubeLink1 !== "" && youtubeLink2 !== "" && youtubeLink3 !== "" && videoTitle1 !== "" && videoTitle2 !== "" && videoTitle3 !== "" && videoImage1 !== "" && videoImage2 !== "" && videoImage3 !== "") {
            let urls = []
            arr.map((v, i) => {
                post({ data: v }, "images/upload")
                    .then(({ data }) => {
                        // console.log(data.url)
                        urls.push(data.url)
                        if (i >= arr.length - 1) {
                            const arrOfObj = [
                                { youtubeLink1, videoTitle1, videoImage1: urls[0] },
                                { youtubeLink2, videoTitle2, videoImage2: urls[0] },
                                { youtubeLink3, videoTitle3, videoImage3: urls[0] }];
                            post({ home_help: arrOfObj }, "home/add")
                                .then(({ status }) => {
                                    if (status == 200) {
                                        alert("Successfully added")
                                        setYoutubeLink1("")
                                        setYoutubeLink2("")
                                        setYoutubeLink3("")
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
            })
        } else {
            alert("ALL FEILDES ARE REQUAIER")
        }
    }



    const saveSlasemaneLink = () => {

        if (salseManeYoutubeLink !== "" && salseManeImage !== "" && salseManeTitle) {
            setSalseManeLoader(true)
            post({ data: salseManeImage }, "images/upload").then(({ data }) => {
                post({ slseman_help: salseManeYoutubeLink, title: salseManeTitle, image: data.url }, "slaseman-help/add").
                    then(({ status }) => {
                        setSalseManeLoader(false)
                        if (status == 200) {
                            setSalseManeYoutubeLink("")
                            window.location.reload();
                            salseManeVideoList.push({ slseman_help: salseManeYoutubeLink, title: salseManeTitle, image: data.url })
                            setSalseManeVideoList(salseManeVideoList)
                        }
                    }).catch(err => {
                        setSalseManeLoader(false)
                    })
            }).catch(() => {
                setSalseManeLoader(false)

            })
        }
    }



    const saveMarketingLink = () => {
        if (marckettingYoutubeLink !== "") {
            post({ marketing_help: marckettingYoutubeLink }, "marketing-help/add").then(({ status }) => {
                if (status == 200) {
                    setMarckettingYoutubeLink("")
                    alert("Successfully added")
                }
            }).catch(err => {
            })
        }
    }

    const getProductImg = (files) => {
        if (files[0]) {
            seHomeSlider(files[0].base64)
        }
    }
    const saveDashboardImgs = () => {
        if (homeSlider !== "") {
            post({ data: homeSlider }, "images/upload").then(({ data }) => {
                console.log(data)
                post({ dashboard_imgs: data.url }, "dashbordImages/add").then(({ status }) => {
                    if (status == 200) {
                        imgList.push({ dashboard_imgs: data.url })
                        setImgsList(imgList)
                        seHomeSlider("")
                        alert("Successfully added")
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const deleteImg = (v) => {
        post({ _id: v._id }, "dashbordImages/delete")
            .then((data) => {
                setImgsList(imgList.filter(x => x._id !== v._id))
            })
    }



    const removeSlaseManHelp = (e, v) => {
        e.preventDefault()
        post({ _id: v._id }, "slaseman-help/delete")
            .then(({ data }) => {
                if (data.code == 200) {
                    setSalseManeVideoList(salseManeVideoList.filter(x => x._id !== v._id))
                }
            })
    }


    return (
        <><UserHeader />
            <Container
                className="mt--9"
                fluid>
                <Row>
                    <Col className="order-xl-1" xl="12"  >
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Create Product</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody style={{ backgroundColor: "#fff" }} >
                                <Nav tabs>
                                    {/* <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            Home
                                            </NavLink>
                                    </NavItem> */}
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            Slasename
                                         </NavLink>
                                    </NavItem>
                                    {/* <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '3' })}
                                            onClick={() => { toggle('3'); }}
                                        >
                                            Marckting
                                         </NavLink>
                                    </NavItem> */}
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '4' })}
                                            onClick={() => { toggle('4'); }}
                                        >
                                            Home Slider
                                         </NavLink>
                                    </NavItem>
                                </Nav>
                                <br />
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Card className="bg-secondary"  >
                                            <CardHeader className="bg-white border-0">
                                                <Row className="align-items-center">
                                                    <Col xs="8">
                                                        <h3 className="mb-0">Home</h3>
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody style={{ backgroundColor: "#fff" }} >
                                                <Row>

                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Youtube link</label>
                                                            <Input
                                                                onChange={(e) => setYoutubeLink1(e.target.value)}
                                                                name={"Youtube Link"}
                                                                value={youtubeLink1}
                                                                id="input-address"
                                                                placeholder="Youtube link"
                                                                type="text" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Title</label>
                                                            <Input
                                                                onChange={(e) => setVideoTitle1(e.target.value)}
                                                                name={"videoTital1"}
                                                                value={videoTitle1}
                                                                id="input-address"
                                                                placeholder="Title"
                                                                type="text" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Youtube link</label>
                                                            <FileBase64
                                                                id="exampleCustomFileBrowser"
                                                                label="Upload Image"
                                                                onDone={(e) => setVideoImage1(e.base64)} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Youtube link</label>
                                                            <Input
                                                                onChange={(e) => setYoutubeLink2(e.target.value)}
                                                                name={"Youtube Link"}
                                                                value={youtubeLink2}
                                                                id="input-address"
                                                                placeholder="Youtube link"
                                                                type="text" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Title</label>
                                                            <Input
                                                                onChange={(e) => setVideoTitle2(e.target.value)}
                                                                name={"videoTital1"}
                                                                value={videoTitle2}
                                                                id="input-address"
                                                                placeholder="Title"
                                                                type="text" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Youtube link</label>
                                                            <FileBase64
                                                                id="exampleCustomFileBrowser"
                                                                label="Upload Image"
                                                                onDone={(e) => setVideoImage2(e.base64)} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Youtube link</label>
                                                            <Input
                                                                onChange={(e) => setYoutubeLink3(e.target.value)}
                                                                name={"Youtube Link"}
                                                                value={youtubeLink3}
                                                                id="input-address"
                                                                placeholder="Youtube link"
                                                                type="text" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Title</label>
                                                            <Input
                                                                onChange={(e) => setVideoTitle3(e.target.value)}
                                                                name={"videoTital1"}
                                                                value={videoTitle3}
                                                                id="input-address"
                                                                placeholder="Title"
                                                                type="text" />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Youtube link</label>
                                                            <FileBase64
                                                                id="exampleCustomFileBrowser"
                                                                label="Upload Image"
                                                                onDone={(e) => setVideoImage3(e.base64)} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12">
                                                        <Button onClick={() => saveHomeLink()} color="info" style={{ width: "100%" }} >Save</Button>
                                                    </Col>
                                                </Row>

                                            </CardBody>
                                            <CardBody>
                                                {homeVideosList.map((v, i) => {
                                                    const { home_help } = v
                                                    return (
                                                        <div key={i} >
                                                            <h4 style={{ marginLeft: 10 }} >Row Number: {i + 1}</h4>
                                                            <ListGroup>
                                                                <ListGroupItem tag="a" href={home_help[0]}>{home_help[0].videoTitle1}</ListGroupItem>
                                                                <ListGroupItem tag="a" href={home_help[1]}>{home_help[1].videoTitle2}</ListGroupItem>
                                                                <ListGroupItem tag="a" href={home_help[2]}>{home_help[2].videoTitle3}</ListGroupItem>
                                                            </ListGroup>
                                                            <br />
                                                        </div>
                                                    )
                                                })}
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Card className="bg-secondary"  >
                                            <CardHeader className="bg-white border-0">
                                                <Row className="align-items-center">
                                                    <Col xs="8">
                                                        <h3 className="mb-0">Slasename</h3>
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody style={{ backgroundColor: "#fff" }} >
                                                <Row>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Youtube link</label>
                                                            <Input
                                                                onChange={(e) => setSalseManeYoutubeLink(e.target.value)}
                                                                name={"Youtube Link"}
                                                                value={salseManeYoutubeLink}
                                                                id="input-address"
                                                                placeholder="Youtube link"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Title</label>
                                                            <Input
                                                                onChange={(e) => setSalseManeTitle(e.target.value)}
                                                                // name={"Youtube Link"}
                                                                value={salseManeTitle}
                                                                id="input-address"
                                                                placeholder="Video Title"
                                                                type="text"
                                                            />
                                                        </FormGroup>

                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Thumbnail</label>
                                                            <FileBase64
                                                                id="exampleCustomFileBrowser"
                                                                label="Upload Image"
                                                                onDone={(e) => setSalseManeImage(e.base64)} />
                                                        </FormGroup>
                                                    </Col>
                                                    {
                                                        salseManeLoader ?
                                                            <Col style={{ textAlign: "center", fontWeight: "bold" }} >
                                                                Saveing...
                                                        </Col>
                                                            :
                                                            <Col md="12">
                                                                <Button onClick={() => saveSlasemaneLink()} color="info" style={{ width: "100%" }} >Save</Button>
                                                            </Col>
                                                    }
                                                </Row>
                                                {salseManeVideoList.map((v, i) => {
                                                    console.log(salseManeVideoList)
                                                    return (
                                                        <ListGroup key={i} >
                                                            <div >
                                                                <br />
                                                                <div></div>
                                                                <h4 style={{ marginLeft: 10 }} >Row Number: {i + 1}</h4>

                                                                <ListGroupItem tag="h4" >
                                                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                                                        <a href={v.slseman_help} target={"_blanck"} >
                                                                            {v.title || "Title"}
                                                                        </a>
                                                                        <a onClick={(e) => removeSlaseManHelp(e, v)} href={"#"}>
                                                                            Remove
                                                                        </a>
                                                                    </div>
                                                                </ListGroupItem>
                                                            </div>
                                                        </ListGroup>
                                                    )
                                                })}
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Card className="bg-secondary"  >
                                            <CardHeader className="bg-white border-0">
                                                <Row className="align-items-center">
                                                    <Col xs="8">
                                                        <h3 className="mb-0">Marckting</h3>
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody style={{ backgroundColor: "#fff" }} >
                                                <Row>
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-address" >Youtube link</label>
                                                            <Input
                                                                onChange={(e) => { setMarckettingYoutubeLink(e.target.value) }}
                                                                name={"Youtube Link"}
                                                                value={marckettingYoutubeLink}
                                                                id="input-address"
                                                                placeholder="Youtube link"
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                        <Row>
                                                            <Col md="12">
                                                                <Button color="info" onClick={() => saveMarketingLink()} style={{ width: "100%" }} >Save</Button>

                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <Card className="bg-secondary"  >
                                            <CardHeader className="bg-white border-0">
                                                <Row className="align-items-center">
                                                    <Col xs="8">
                                                        <h3 className="mb-0">Home Slider</h3>
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody style={{ backgroundColor: "#fff" }} >
                                                <Row>
                                                    <Col lg="10">
                                                        <FormGroup>
                                                            <FileBase64
                                                                id="exampleCustomFileBrowser"
                                                                name="categoryImg"
                                                                label="Select Category Icon"
                                                                multiple={true}
                                                                onDone={(e) => { getProductImg(e) }} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <Button onClick={() => saveDashboardImgs()} color="info" style={{ width: "100%" }} >Save</Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={"12"} >
                                                        <Table className="align-items-center table-flush" responsive>
                                                            <thead className="thead-light" >
                                                                <tr>
                                                                    <th scope="col" >No</th>
                                                                    <th scope="col">Image</th>
                                                                    {/* <th scope="col" >Action</th> */}
                                                                    <th scope="col" >Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody >
                                                                {
                                                                    imgList.map((v, i) => {
                                                                        return (
                                                                            <tr key={i} >
                                                                                <th style={{ textAlign: "left" }} >{i + 1}</th>
                                                                                <td >
                                                                                    <a
                                                                                        className="avatar rounded-circle mr-3"
                                                                                        href="#pablo"
                                                                                        onClick={e => e.preventDefault()}
                                                                                    >
                                                                                        <img
                                                                                            alt="..."
                                                                                            style={{ height: 50, width: 50 }}
                                                                                            src={v.dashboard_imgs}
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                {/* <th>
                                                                                    <Nav>
                                                                                        <NavItem onClick={() => { }}>
                                                                                            <NavLink to={"#/---"} tag={NavLinkRRD} onClick={() => { }} activeClassName="active">
                                                                                                View
                                                                                </NavLink>
                                                                                        </NavItem>
                                                                                    </Nav>
                                                                                </th> */}
                                                                                <th>
                                                                                    <Nav>
                                                                                        <NavItem onClick={() => { deleteImg(v) }}>
                                                                                            <NavLink to={"#/---"} tag={NavLinkRRD} onClick={() => { }} activeClassName="active">
                                                                                                Delete
                                                                                </NavLink>
                                                                                        </NavItem>
                                                                                    </Nav>
                                                                                </th>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }

                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </TabPane>

                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>

    );
}


export default Example