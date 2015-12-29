from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

"""
The metadata API is used to allow customization of how `OPTIONS` requests
are handled. We currently provide a single default implementation that returns
some fairly ad-hoc information about the view.

Future implementations might use JSON schema or other definitions in order
to return this information in a more standardized way.
"""

from collections import OrderedDict

from django.utils.encoding import force_text

from rest_framework.metadata import SimpleMetadata


class VerboseMetadata(SimpleMetadata):
    def get_field_info(self, field):
        """
        Given an instance of a serializer field, return a dictionary
        of metadata about it.
        """
        field_info = OrderedDict()
        field_info['type'] = self.label_lookup[field]
        field_info['required'] = getattr(field, 'required', False)

        attrs = [
            'read_only', 'label', 'help_text',
            'min_length', 'max_length',
            'min_value', 'max_value'
        ]

        for attr in attrs:
            value = getattr(field, attr, None)
            if value is not None and value != '':
                field_info[attr] = force_text(value, strings_only=True)

        verbose_name = getattr(field, 'verbose_name', None)
        if verbose_name:
            field_info['label'] = force_text(verbose_name, strings_only=True)

        if getattr(field, 'child', None):
            field_info['child'] = self.get_field_info(field.child)
        elif getattr(field, 'fields', None):
            field_info['children'] = self.get_serializer_info(field)

        if not field_info.get('read_only') and hasattr(field, 'choices'):
            field_info['choices'] = [
                {
                    'value': choice_value,
                    'display_name': force_text(choice_name, strings_only=True)
                }
                for choice_value, choice_name in field.choices.items()
            ]

        return field_info