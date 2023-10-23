import React from "react";
import axios from "axios";
import { Table } from "antd";
import { useState, useEffect } from "react";
import UserProfileLogo from "./UserProfileLogo";
import StreamingStatus from "./StreamingStatus";
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
    {
      key: "logo",
      title: "logo",
      dataIndex: "logo",
      render: (_, { logo }) => <UserProfileLogo url={logo} />,
    },
    {
      key: "link",
      title: "link",
      dataIndex: ["display_name", "url"],
      render: (_, { name, url }) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ),
    },
    {
      key: "status",
      title: "status",
      dataIndex: "status",
      filters: [
        { text: "Online", value: "Online" },
        { text: "Offline", value: "Offline" },
      ],
      filterMode: "tree",
      onFilter: (value, record) => {
        console.log(record.status);
        let myStatus = record.status == null ? "Offline" : "Online";
        return myStatus.includes(value);
      },
      width: "5%",
      render: (_, { status }) => {
        return status == null ? "Offline" : "Online";
      },
    },
    {
      key: "content",
      title: "content",
      dataIndex: "status",
      render: (_, { status }) => {
        return status == null ? (
          "Not Available"
        ) : (
          <StreamingStatus status={status} />
        );
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record, index) =>
          record.status == null ? "red" : "green"
        }
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "14px",
        }}
        onChange={onChange}
      ></Table>
    </div>
  );
};

export default ProgramTable;
