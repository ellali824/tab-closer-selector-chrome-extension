let Link = function () {
};
Link.prototype.init1 = function (id, name, link, icon) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.icon = icon;
    this.order = null
    return this;
};

Link.prototype.init2 = function (id, name, link, icon, order) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.icon = icon;
    this.order = order;
    return this;
};
