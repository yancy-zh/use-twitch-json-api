import React from "react";
import axios from "axios";
import { Table } from "antd";
import { useState, useEffect } from "react";
import UserProfileLogo from "./UserProfileLogo";
import StreamingStatus from "./StreamingStatus";
import FilterTab from "./FilterTab";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TvIcon from "@mui/icons-material/Tv";
import TvOffIcon from "@mui/icons-material/TvOff";
import "./BoardHeader.css";
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
  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("parameter changed", filters);
    setFilteredInfo(filters);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const setStatusFilterOnline = () => {
    setFilteredInfo({ status: ["Online"] });
  };
  const setStatusFilterOffline = () => {
    setFilteredInfo({ status: ["Offline"] });
  };
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
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => {
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
  const styles = {
    divStyle1: { backgroundColor: "red", width: "100px" },
    divStyle2: { backgroundColor: "#4CAF50", width: "100px" },
    divStyle3: { backgroundColor: "royalblue", width: "100px" },
  };
  return (
    <div className="table-wrapper">
      {/* three buttons for filtering programs */}
      <div className="filters">
        <FilterTab
          title="all"
          icon={<DoneAllIcon />}
          style={styles.divStyle1}
          onClickCallBack={clearFilters}
        />
        <FilterTab
          title="online"
          icon={<TvIcon />}
          style={styles.divStyle2}
          onClickCallBack={setStatusFilterOnline}
        />
        <FilterTab
          title="offline"
          icon={<TvOffIcon />}
          style={styles.divStyle3}
          onClickCallBack={setStatusFilterOffline}
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record, index) =>
          record.status == null ? "red" : "green"
        }
        onChange={handleChange}
      ></Table>
    </div>
  );
};

export default ProgramTable;
