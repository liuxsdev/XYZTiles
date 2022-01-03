import { TileLayer, TileLayerOptions } from "leaflet";

class Tianditu {
    /**
     * 天地图XYZ Tiles
     * 官方网站地图API说明:http://lbs.tianditu.gov.cn/server/MapService.html
     * 申请key(accesstoken):https://console.tianditu.gov.cn/api/key
     * subdomains: "01234567",
     * url:https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileRow={y}&TileCol={x}&tk={accessToken}
     * 图层说明:
     * vec_w 矢量底图 Vector 球面墨卡托投影(WGS84)
     * cva_w 矢量注记 Chinese Vector Annotation 球面墨卡托投影(WGS84)
     */
    accessToken: string;
    private options: TileLayerOptions = {
        subdomains: "01234567",
        maxZoom: 20,
        attribution: 'Map Data &copy; <a href="https://www.tianditu.gov.cn">天地图</a>',
        accessToken: "",
    };
    private urls = {
        host: "https://t{s}.tianditu.gov.cn",
        service: "wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0",
        tile: "&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileRow={y}&TileCol={x}&tk={accessToken}",
    };
    private tileUrls = {
        vec_w: `${this.urls.host}/vec_w/${this.urls.service}&LAYER=vec${this.urls.tile}`,
        cva_w: `${this.urls.host}/cva_w/${this.urls.service}&LAYER=cva${this.urls.tile}`,
        img_w: `${this.urls.host}/img_w/${this.urls.service}&LAYER=img${this.urls.tile}`,
    };
    constructor(accessToken: string) {
        this.accessToken = accessToken;
        if (this.accessToken == "") {
            console.log("天地图token未设置");
        }
    }
    //矢量底图
    vec_w() {
        this.options.accessToken = this.accessToken;
        return new TileLayer(this.tileUrls.vec_w, this.options);
    }
    //矢量注记
    cva_w() {
        this.options.accessToken = this.accessToken;
        this.options.attribution = ""; //不会单独想要注记层吧?
        return new TileLayer(this.tileUrls.cva_w, this.options);
    }
    //影像底图
    img_w() {
        this.options.accessToken = this.accessToken;
        return new TileLayer(this.tileUrls.img_w, this.options);
    }
}

class GoogleMap {
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
    private options: TileLayerOptions = {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        maxZoom: 20,
        attribution:
            'Map Data &copy; <a href="https://developers.google.com/maps">Google Maps</a>',
    };
    private getUrl(lyrs: string) {
        return `http://{s}.google.com/vt/lyrs=${lyrs}&x={x}&y={y}&z={z}`;
    }
    satellite() {
        return new TileLayer(this.getUrl("s"), this.options);
    }
}
class OSM {
    /**
     * OpenStreetMap
     * See:https://wiki.openstreetmap.org/wiki/Tile_servers
     * 标准地图:https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
     * subdomains:'abc' 默认
     */
    private tile_url: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    private options: TileLayerOptions = {
        maxZoom: 19,
        attribution:
            'Map Data &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
    };
    stand() {
        return new TileLayer(this.tile_url, this.options);
    }
}

export { Tianditu, GoogleMap, OSM };
