from django.db import models


class DTFieldCustom(models.DateTimeField):

    def value_to_string(self, obj):
        v = super().value_from_object(obj)
        if v:
            return v.strftime("%d %b, %Y %H:%M:%S")
        return ''


class CommonFieldsModel(models.Model):
    """
    Abstract base class model that provides
    common fields for every model and
    self-updating `created` and `modified`
    fields.
    """
    created = DTFieldCustom(
        auto_now_add=True)
    modified = DTFieldCustom(
        auto_now=True)

    author = models.CharField(
        max_length=30,
        null=False,
        editable=True,
        default='unknown',)

    class Meta:
        abstract = True

