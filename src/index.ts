import { TileLayer, TileLayerOptions } from "leaflet";

class Tianditu {
    /**
     * 天地图XYZ Tiles
     * 官方网站地图API说明：http://lbs.tianditu.gov.cn/server/MapService.html
     * subdomains: "01234567",
     * vec_w 矢量底图 球面墨卡托投影
     * cva_w 矢量注记 球面墨卡托投影
     */
    accessToken: string;
    options: TileLayerOptions = {
        subdomains: "01234567",
        maxZoom: 20,
        attribution: 'Map data &copy; <a href="https://www.tianditu.gov.cn">天地图</a>',
        accessToken: "",
    };
    tileUrls = {
        tdt_vec_w:
            "https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileRow={y}&TileCol={x}&tk={accessToken}",
        tdt_cva_w:
            "https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileRow={y}&TileCol={x}&tk={accessToken}",
    };
    constructor(accessToken: string) {
        this.accessToken = accessToken;
        if (this.accessToken == "") {
            console.log("天地图token未设置");
        }
    }
    vec_w() {
        this.options.accessToken = this.accessToken;
        return new TileLayer(this.tileUrls.tdt_vec_w, this.options);
    }
}

const XYZTIles = {
    tianditu: Tianditu,
};

export { XYZTIles };
