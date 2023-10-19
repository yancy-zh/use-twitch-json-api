import React from "react";
import axios from "axios";
import { Table } from "antd";
import { useState, useEffect } from "react";
import UserProfileLogo from "./UserProfileLogo";
const ProgramTable = () => {
  const users = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
  ];
  const [dataSource, setDataSource] = useState([]);
  const getChannelForUser = (user) => {
    const baseUrl =
      "https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/";
    const apiEndpoint = baseUrl + user;
    var wikiConfig = {
      timeout: 6500,
    };
    async function getJsonResp(url, config) {
      const res = await axios.get(url, config);
      return res.data;
    }
    return getJsonResp(apiEndpoint, wikiConfig)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log("an error occurred: " + error);
        return null;
      });
  };
  const getStreamForUser = (user) => {
    const baseUrl =
      "https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/";
    const apiEndpoint = baseUrl + user;
    var wikiConfig = {
      timeout: 6500,
    };
    async function getJsonResp(url, config) {
      const res = await axios.get(url, config);
      return res.data;
    }
    return getJsonResp(apiEndpoint, wikiConfig)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log("an error occurred: " + error);
        return null;
      });
  };
  const fetchDataSource = async () => {
    const result = await Promise.all(
      users.map((user) => getChannelForUser(user))
    );
    console.log("fetching data for users: " + result);
    return result;
  };
  useEffect(() => {
    fetchDataSource()
      .then((data) => {
        setDataSource(data);
      })
      .catch((err) => {
        console.log("the err is" + err);
      });
  }, []);
  const columns = [
    { key: "name", title: "name", dataIndex: "display_name" },
    {
      key: "link",
      title: "link",
      dataIndex: "url",
    },
    {
      key: "logo",
      title: "logo",
      dataIndex: "logo",
      render: (_, { logo }) => <UserProfileLogo url={logo} />,
    },
    {
      key: "status",
      title: "status",
      dataIndex: "status",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
};

export default ProgramTable;
