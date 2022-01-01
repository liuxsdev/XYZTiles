import { TileLayer, TileLayerOptions } from "leaflet";

/**
 * 天地图XYZ Tiles
 * 官方网站地图API说明:http://lbs.tianditu.gov.cn/server/MapService.html
 * 申请key(accesstoken):https://console.tianditu.gov.cn/api/key
 * subdomains: "01234567",
 * 图层说明:
 * vec_w 矢量底图 Vector 球面墨卡托投影(WGS84)
 * cva_w 矢量注记 Chinese Vector Annotation 球面墨卡托投影(WGS84)
 */
class Tianditu {
    accessToken: string;
    options: TileLayerOptions = {
        subdomains: "01234567",
        maxZoom: 20,
        attribution: 'Map Data &copy; <a href="https://www.tianditu.gov.cn">天地图</a>',
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

/**
 * 谷歌地图
 * url:http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}
 * subdomains:['mt0','mt1','mt2','mt3']
 * maxzoom:20
 * h = roads only
 * m = standard roadmap
 * p = terrain
 * r = somehow altered roadmap
 * s = satellite only 影像图
 * t = terrain only 地形图
 * y = hybrid
 *
 */
class GoogleMap {
    options: TileLayerOptions = {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        maxZoom: 20,
        attribution: 'Map Data &copy; <a href="https://developers.google.com/maps">Google Maps</a>',
    };
    private getUrl(lyrs: string) {
        return `http://{s}.google.com/vt/lyrs=${lyrs}&x={x}&y={y}&z={z}`;
    }
    satellite() {
        return new TileLayer(this.getUrl("s"), this.options);
    }
}

const XYZTiles = {
    tianditu: Tianditu,
    googlemap: GoogleMap,
};

export { XYZTiles };
